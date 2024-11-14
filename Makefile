define build_index
    curl https://github.com/errata-ai/library/releases/latest/download/INDEX.zip -L -o INDEX.zip
    unzip INDEX.zip -d lambda/search
endef

.PHONY: build preview

all: build

build:
	$(call build_index)
	pnpm run build

preview:
	$(call build_index)
	pnpm run build -- -b ${DEPLOY_PRIME_URL}
