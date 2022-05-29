package main

import (
	"bytes"
	"embed"
	"encoding/json"
	"html"
	"os"
	"path/filepath"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/errata-ai/library/pkg/search"
	strip "github.com/grokify/html-strip-tags-go"
)

//go:embed INDEX/*
var f embed.FS
var indexName = "INDEX"

type Result struct {
	ID       string
	Fragment string
}

func getFragment(f map[string][]string) string {
	var fragment string

	if s, ok := f["text"]; ok {
		fragment = s[0]
	} else {
		// Returning a fragment here would be redundant -- it's already going to be displayed
		// in either the title or a tag.
		fragment = ""
	}

	return html.UnescapeString(strip.StripTags(fragment))
}

func toJSON(t interface{}) (string, error) {
	bf := bytes.NewBuffer([]byte{})

	jsonEncoder := json.NewEncoder(bf)
	jsonEncoder.SetEscapeHTML(false)

	err := jsonEncoder.Encode(t)
	return bf.String(), err
}

func newErrResponse(err error) (*events.APIGatewayProxyResponse, error) {
	return &events.APIGatewayProxyResponse{Body: err.Error(), StatusCode: 500}, err
}

func writeIndex(name string) (string, error) {
	index := filepath.Join(os.TempDir(), name, "store")

	err := os.MkdirAll(index, os.ModePerm)
	if err != nil {
		return "", err
	}

	files, err := f.ReadDir(name)
	if err != nil {
		return "", err
	}

	for _, file := range files {
		fp := file.Name()

		b, err := f.ReadFile(filepath.Join(name, fp))
		if err != nil {
			return "", err
		}

		path := filepath.Join(os.TempDir(), name, fp)
		if fp != "index_meta.json" {
			path = filepath.Join(os.TempDir(), name, "store", fp)
		}

		err = os.WriteFile(path, b, os.ModePerm)
		if err != nil {
			return "", err
		}
	}

	return filepath.Join(os.TempDir(), name), nil
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var results []Result

	tmpIndex, err := writeIndex(indexName)
	if err != nil {
		return newErrResponse(err)
	}

	engine, err := search.LoadEngine(tmpIndex)
	if err != nil {
		return newErrResponse(err)
	}
	query := request.QueryStringParameters["q"]

	hits, err := engine.Search(query)
	if err != nil {
		return newErrResponse(err)
	}

	for _, hit := range hits {
		results = append(results, Result{
			ID:       hit.ID,
			Fragment: getFragment(hit.Fragments),
		})
	}

	j, err := toJSON(results)
	if err != nil {
		return newErrResponse(err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json"},
		Body:            j,
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
