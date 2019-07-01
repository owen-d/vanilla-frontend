SWAGGER_FILE ?= $(HOME)/projects/vanilla/swagger.json

.PHONY: gen
gen:
	docker run --rm -it -v $(SWAGGER_FILE):/swagger.json -v $(PWD):/work openapitools/openapi-generator-cli generate -i /swagger.json -g typescript-axios -o /work/src/lib/vanilla-api
