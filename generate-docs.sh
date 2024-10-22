#!/bin/bash

SCHEMA_DIR="src/schemas"
OUTPUT_DIR="docusaurus/docs"
OVERVIEW="$OUTPUT_DIR/overview.md"

mkdir -p $OUTPUT_DIR

# init overview.md
echo "# ATT&CK Schemas" > $OVERVIEW
echo "" >> $OVERVIEW

# attack spec version
specVersion=$(cat "ATTACK_SPEC_VERSION")
echo "Current ATT&CK Spec Version: [$specVersion](https://github.com/mitre-attack/attack-stix-data/blob/master/CHANGELOG.md)" >> $OVERVIEW
echo "" >> $OVERVIEW

# schema table
echo "| ATT&CK Concept | STIX Object Type | Link |" >> $OVERVIEW
echo "|----------------|------------------|------|" >> $OVERVIEW

find $SCHEMA_DIR -name "*.schema.ts" | while read schemaFile; do
	fileName="$(basename "$schemaFile")"

	# skip stix-bundle for now
	if [[ "${fileName}" == "stix-bundle.schema.ts" ]]; then
		# add to overview
		echo "| STIX Bundle | SDO | [Schema](/docs/sdo/stix-bundle.schema) |" >> $OVERVIEW
		continue
	fi

	# get relative file path
	relativePath="${schemaFile#$SCHEMA_DIR/}"

	# get schema title
	title=$(sed -e 's/-/ /g' <<< "${fileName%%.*}")
	title=$(echo "$title" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
	# title="$(tr '[:lower:]' '[:upper:]' <<< "${title:0:1}")${title:1}"

	# set output file path
	outputFile="$OUTPUT_DIR/${relativePath/.ts/.md}"

	# convert zod schemas to md
	npx zod2md --entry $schemaFile --title "$title Schema" --output "$outputFile"

	# add schema to overview table
	schemaLink="${relativePath/.ts/.md}"
	stixType=$(dirname "$relativePath" | cut -d '/' -f 1 | tr '[:lower:]' '[:upper:]')

	echo "| $title | $stixType | [Schema](/docs/$schemaLink) |" >> $OVERVIEW

done 