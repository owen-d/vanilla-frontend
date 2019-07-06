SWAGGER_FILE ?= $(HOME)/projects/vanilla/swagger.json
SCRATCH_DIR = scratch
GEN_CLI_DIR = $(SCRATCH_DIR)/gen/cli
GENERATED_CRAWLER = $(GEN_CLI_DIR)/genItems.js
GENERATED_PARSER = $(GEN_CLI_DIR)/refineItems.js
TS_LIBS = $(shell find src/lib -type f -name '*.ts')
TS_CLI_FILES = $(shell find src/cli -type f -name '*.ts')

CRAWLER_OUTPUT_DIR ?= $(SCRATCH_DIR)/assets
ITEMS_NDJSON = items.ndjson
PARSED_NDJSON = items.parsed.ndjson

.PHONY: gen
gen:
	docker run --rm -it -v $(SWAGGER_FILE):/swagger.json -v $(PWD):/work openapitools/openapi-generator-cli generate -i /swagger.json -g typescript-axios -o /work/src/lib/vanillaApi

.PHONY: test
test:
	npx jest

.PHONY: repl
repl:
	node --experimental-repl-await

.PHONY: gen-data
gen-data: $(GENERATED_CRAWLER)
	$(GENERATED_CRAWLER) -d $(CRAWLER_OUTPUT_DIR)

.PHONY: parse-items
parse-items: $(GENERATED_PARSER)
	$(GENERATED_PARSER) --in $(CRAWLER_OUTPUT_DIR)/$(ITEMS_NDJSON) --dst $(CRAWLER_OUTPUT_DIR)/$(PARSED_NDJSON)

$(GENERATED_CRAWLER) $(GENERATED_PARSER): $(TS_CLI_FILES) $(TS_LIBS)
	npx tsc --outDir $(SCRATCH_DIR)/gen src/cli/*.ts
	chmod +x $@
