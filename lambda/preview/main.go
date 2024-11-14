package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/dyatlov/go-opengraph/opengraph"
)

func newErrResponse(err error) (*events.APIGatewayProxyResponse, error) {
	return &events.APIGatewayProxyResponse{Body: err.Error(), StatusCode: 500}, err
}

func toJSON(t interface{}) (string, error) {
	bf := bytes.NewBuffer([]byte{})

	jsonEncoder := json.NewEncoder(bf)
	jsonEncoder.SetEscapeHTML(false)

	err := jsonEncoder.Encode(t)
	return bf.String(), err
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var reader io.Reader

	url := request.QueryStringParameters["url"]
	og := opengraph.NewOpenGraph()

	resp, err := http.Get(url)
	if err != nil {
		return newErrResponse(err)
	}
	defer resp.Body.Close()

	reader = resp.Body
	if err := og.ProcessHTML(reader); err != nil {
		return newErrResponse(err)
	}

	j, err := toJSON(og)
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
