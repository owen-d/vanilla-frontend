# path to https://github.com/owen-d/vanilla/blob/master/swagger.json
SWAGGER_FILE ?= $(HOME)/projects/vanilla/swagger.json

REPO = owend/vanilla-frontend
TAG ?= 0.1.0
IMAGE = $(REPO):$(TAG)

TSC ?= npx tsc

SCRATCH_DIR = scratch
DIST_DIR = dist
GEN_CLI_DIR = $(SCRATCH_DIR)/gen/cli
GENERATED_CRAWLER = $(GEN_CLI_DIR)/genItems.js
GENERATED_PARSER = $(GEN_CLI_DIR)/refineItems.js
GENERATED_INDEXER = $(GEN_CLI_DIR)/buildIdx.js
CLIS = $(GENERATED_CRAWLER) $(GENERATED_PARSER) $(GENERATED_INDEXER)
TS_LIBS = $(shell find src/lib -type f -name '*.ts')
TS_CLI_FILES = $(shell find src/cli -type f -name '*.ts')
ES_INDEX ?= items
ES_HOST ?= http://localhost:9200

CRAWLER_OUTPUT_DIR ?= $(SCRATCH_DIR)/assets
ITEMS_NDJSON = items.ndjson
PARSED_NDJSON = items.parsed.ndjson

TS_INDEX = $(DIST_DIR)/server/index.js

.PHONY: test
test:
	npx jest

.PHONY: repl
repl:
	node --experimental-repl-await

.PHONY: server
server: $(TS_INDEX)
	node $<

#####################
# assorted codegen/indexing #
#####################
.PHONY: build-server
build-server: $(TS_INDEX)

$(TS_INDEX): $(TS_SRC) | $(ZIPCODES_MAP)
	$(TSC) --module commonjs

.PHONY: gen-api-client
gen-api-client:
	docker run --rm -it -v $(SWAGGER_FILE):/swagger.json -v $(PWD):/work openapitools/openapi-generator-cli generate -i /swagger.json -g typescript-axios -o /work/src/lib/vanillaApi

.PHONY: gen-data
gen-data: $(GENERATED_CRAWLER)
	$(GENERATED_CRAWLER) -d $(CRAWLER_OUTPUT_DIR)

.PHONY: parse-items
parse-items: $(GENERATED_PARSER)
	$(GENERATED_PARSER) --in $(CRAWLER_OUTPUT_DIR)/$(ITEMS_NDJSON) --dst $(CRAWLER_OUTPUT_DIR)/$(PARSED_NDJSON)

.PHONY: index
index: $(GENERATED_INDEXER)
	$(GENERATED_INDEXER) --src=$(CRAWLER_OUTPUT_DIR)/$(PARSED_NDJSON) \
		--index=$(ES_INDEX) --url="$(ES_HOST)"

# snapshot tarballs the assets dir
.PHONY: snapshot
snapshot:
	tar -czvf $(SCRATCH_DIR)/snapshot.tar.gz --exclude '*.DS_Store' $(CRAWLER_OUTPUT_DIR)


$(CLIS): $(TS_CLI_FILES) $(TS_LIBS)
	$(TSC) --outDir $(SCRATCH_DIR)/gen src/cli/*.ts && chmod +x  $(SCRATCH_DIR)/gen/cli/*.js

.PHONY: build-docker
build-docker:
	cp -R $(CRAWLER_OUTPUT_DIR)/icon ./icons
	docker build -t $(IMAGE) .

#####################
# js stuff #
#####################
