all: build

build:
	# Download our index ...
	curl https://github.com/errata-ai/library/releases/latest/download/INDEX.zip -L -o INDEX.zip
	unzip INDEX.zip -d functions/search
	# Build the site ...
	npm run build
