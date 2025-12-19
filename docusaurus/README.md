# ATT&CK Data Model Documentation

This repository contains the automated documentation for the ATT&CK Data Model. The project
leverages Zod schemas, defined in `zod/schemas/`, to generate Markdown files that are processed
and served as static documentation using [Docusaurus](https://docusaurus.io/).

The automation is handled by the `generate-docs.sh` script, which processes each `.schema.ts` file
in the schema directory and uses the `zod2md` library to convert to Markdown. The output Markdown
files are stored in the `docs/` directory.

The Docusaurus site is configured and structured for ["Docs Multi-Instance"](https://docusaurus.io/docs/docs-multi-instance) to host the global docs content, schemas reference, and API reference as distinct sets of documentation (each set is its own plugin). The Schemas reference and API reference are each [versioned](https://docusaurus.io/docs/versioning) independently, while the main docs content is un-versioned. Be sure to adhere to Docusaurus's [recommended practices](https://docusaurus.io/docs/versioning#recommended-practices) for versioning.

