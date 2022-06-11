all: build preview

define build_index
    curl https://github.com/errata-ai/library/releases/latest/download/INDEX.zip -L -o INDEX.zip
    unzip INDEX.zip -d functions/search
endef

build:
	$(call build_index)
	npm run build

preview:
	$(call build_index)
	npm run build -- -b $DEPLOY_PRIME_URL
