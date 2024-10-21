#!/bin/bash

SCHEMA_DIR="src/schemas"
OUTPUT_DIR="docusaurus/docs"

mkdir -p $OUTPUT_DIR

find $SCHEMA_DIR -name "*.schema.ts" | while read schemaFile; do
	fileName="$(basename "$schemaFile")"

	# skip stix-bundle for now
	if [[ "${fileName}" == "stix-bundle.schema.ts" ]]; then
		continue
	fi

	# get relative file path
	relativePath="${schemaFile#$SCHEMA_DIR/}"

	# get schema title
	title=$(sed -e 's/-/ /g' <<< "${fileName%%.*}")
	title="$(tr '[:lower:]' '[:upper:]' <<< "${title:0:1}")${title:1}"

	# set output file path
	outputFile="$OUTPUT_DIR/${relativePath/.ts/.md}"

	# convert zod schemas to md
	npx zod2md --entry $schemaFile --title "$title schema" --output "$outputFile"

done 