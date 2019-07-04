SWAGGER_FILE ?= $(HOME)/projects/vanilla/swagger.json
SCRATCH_DIR = scratch
GENERATED_CLI = $(SCRATCH_DIR)/gen/cli/genItems.js

.PHONY: gen
gen:
	docker run --rm -it -v $(SWAGGER_FILE):/swagger.json -v $(PWD):/work openapitools/openapi-generator-cli generate -i /swagger.json -g typescript-axios -o /work/src/lib/vanillaApi

.PHONY: repl
repl:
	node --experimental-repl-await

.PHONY: gen-data
gen-data: $(GENERATED_CLI)
	$(GENERATED_CLI) -d /tmp/tst

$(GENERATED_CLI):
	npx tsc --outDir $(SCRATCH_DIR)/gen src/cli/genItems.ts
	chmod +x $@
