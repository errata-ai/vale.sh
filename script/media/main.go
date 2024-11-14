package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

const library = "https://raw.githubusercontent.com/errata-ai/library/refs/heads/main/library.json"
const ogLambda = `https://vale.sh/.netlify/functions/preview?url=%s`
const data = "../../src/lib/data/media.json"

type OGData struct {
	Type             string `json:"type"`
	URL              string `json:"url"`
	Title            string `json:"title"`
	Description      string `json:"description"`
	Determiner       string `json:"determiner"`
	SiteName         string `json:"site_name"`
	Locale           string `json:"locale"`
	LocalesAlternate any    `json:"locales_alternate"`
	Images           []struct {
		URL       string `json:"url"`
		SecureURL string `json:"secure_url"`
		Type      string `json:"type"`
		Width     int    `json:"width"`
		Height    int    `json:"height"`
	} `json:"images"`
	Audios  any `json:"audios"`
	Videos  any `json:"videos"`
	Article struct {
		PublishedTime  any    `json:"published_time"`
		ModifiedTime   any    `json:"modified_time"`
		ExpirationTime any    `json:"expiration_time"`
		Section        string `json:"section"`
		Tags           any    `json:"tags"`
		Authors        any    `json:"authors"`
	} `json:"article"`
}

type LibraryEntry struct {
	Title  string `json:"title"`
	URL    string `json:"url"`
	Author string `json:"author"`
	Year   int    `json:"year"`
	Type   string `json:"type"`
}

type Media struct {
	LibraryEntry
	Description string `json:"description"`
	Image       string `json:"image"`
	Site        string `json:"site"`
}

func main() {
	// Fetch the library
	resp, err := http.Get(library)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	// Decode the library
	var library []LibraryEntry
	if err := json.NewDecoder(resp.Body).Decode(&library); err != nil {
		log.Fatal(err)
	}

	// Print the library
	var media []Media
	for _, m := range library {
		// Fetch the OG data
		resp, err := http.Get(fmt.Sprintf(ogLambda, m.URL))
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()

		// Decode the OG data
		var ogData OGData
		if err := json.NewDecoder(resp.Body).Decode(&ogData); err != nil {
			log.Fatal(err)
		}

		image := ""
		if len(ogData.Images) > 0 {
			image = ogData.Images[0].URL
		}

		// Check if image URL is accessible:
		if image != "" {
			resp, err := http.Get(image)
			if err != nil {
				log.Printf("Image URL not accessible: %s", image)
				image = ""
			} else {
				defer resp.Body.Close()
			}
		}

		// Append the media
		media = append(media, Media{
			LibraryEntry: m,
			Description:  ogData.Description,
			Image:        image,
			Site:         ogData.SiteName,
		})
	}

	file, err := os.Create(data)
	if err != nil {
		log.Fatal(err)
	}

	// Write the JSON
	if err := json.NewEncoder(file).Encode(media); err != nil {
		log.Fatal(err)
	}

	// Close the file
	if err := file.Close(); err != nil {
		log.Fatal(err)
	}
}
