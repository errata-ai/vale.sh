package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

var configs = "../../../data/configs.yml"

type User struct {
	Source string
	Info   string
	Org    string
	Name   string
}

func main() {
	users := []User{}

	configPath, err := filepath.Abs(configs)
	if err != nil {
		panic(err)
	}

	data, err := os.ReadFile(configPath)
	if err != nil {
		panic(err)
	}

	err = yaml.Unmarshal(data, &users)
	if err != nil {
		panic(err)
	}

	for _, user := range users {
		checkLink(user.Source, user.Name)
	}

}

func checkLink(link, name string) {
	resp, err := http.Get(link)
	if err != nil {
		panic(err)
	} else if resp.StatusCode != http.StatusOK {
		panic(fmt.Sprintf("'%s' is not OK", link))
	}
	fmt.Println(fmt.Sprintf("'%s' is OK", name))
}
