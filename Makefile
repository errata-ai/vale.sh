define build_index
    curl https://github.com/errata-ai/library/releases/latest/download/INDEX.zip -L -o INDEX.zip
    unzip INDEX.zip -d functions/search
endef

.PHONY: build preview

all: build

build:
	$(call build_index)
	npm run build

preview:
	$(call build_index)
	npm run build -- -b $DEPLOY_PRIME_URL
