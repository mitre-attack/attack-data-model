#!/bin/bash

WORKDIR="."
SCHEMA_DIR="$WORKDIR/src/schemas"
OUTPUT_DIR="docusaurus/schemas"
OVERVIEW="$OUTPUT_DIR/index.mdx"

mkdir -p $OUTPUT_DIR

# init index.md
echo "# Schema Reference" > $OVERVIEW
echo "" >> $OVERVIEW

# attack spec version
specVersion=$(cat "$WORKDIR/ATTACK_SPEC_VERSION")
echo "Current ATT&CK Spec Version: [$specVersion](https://github.com/mitre-attack/attack-stix-data/blob/master/CHANGELOG.md)" >> $OVERVIEW
echo "" >> $OVERVIEW

# schema table
echo "| ATT&CK Concept | STIX Object Type | Link |" >> $OVERVIEW
echo "|----------------|------------------|------|" >> $OVERVIEW

find $SCHEMA_DIR -name "*.schema.ts" | while read schemaFile; do
	fileName="$(basename "$schemaFile")"

	# skip software (covered by malware/tool)
	if [[ "${fileName}" == "software.schema.ts" ]]; then
		continue
	fi

	# skip stix-bundle (manually generated) and add to overview page
	if [[ "${fileName}" == "stix-bundle.schema.ts" ]]; then
		echo "| STIX Bundle | SDO | [Schema](./sdo/stix-bundle.schema) |" >> $OVERVIEW
		continue
	fi

	# get relative file path (remove parent directory prefix)
	relativePath="${schemaFile#$SCHEMA_DIR/}"

	# get schema title
	title=$(sed -e 's/-/ /g' <<< "${fileName%%.*}")
	title=$(echo "$title" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

	# set output file path
	outputFile="$OUTPUT_DIR/${relativePath/.ts/.mdx}"

	# convert zod schemas to md
	# pass the parent tsconfig to resolve path aliases
	npx zod2md --entry $schemaFile --title "$title Schema" --output "$outputFile" --tsconfig "$WORKDIR/tsconfig.json"

	# add schema to overview table
	schemaLink="${relativePath/.ts/.mdx}"
	stixType=$(dirname "$relativePath" | cut -d '/' -f 1 | tr '[:lower:]' '[:upper:]')

	echo "| $title | $stixType | [Schema](./$schemaLink) |" >> $OVERVIEW

done
