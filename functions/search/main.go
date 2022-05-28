package main

import (
	"embed"
	"encoding/json"
	"os"
	"path/filepath"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/errata-ai/library/pkg/search"
)

//go:embed INDEX/*
var f embed.FS
var indexName = "INDEX"

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
	tmpIndex, err := writeIndex(indexName)
	if err != nil {
		return newErrResponse(err)
	}

	engine, err := search.LoadEngine(tmpIndex)
	if err != nil {
		return newErrResponse(err)
	}
	query := request.QueryStringParameters["q"]

	results, err := engine.Search(query)
	if err != nil {
		return newErrResponse(err)
	}

	j, err := json.Marshal(results)
	if err != nil {
		return newErrResponse(err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "application/json"},
		Body:            string(j),
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}
