# ATT&CK Data Model Documentation

This repository contains the automated documentation for the ATT&CK Data Model. The project
leverages Zod schemas, defined in `zod/schemas/`, to generate Markdown files that are processed
and served as static documentation using [Docusaurus](https://docusaurus.io/).

The automation is handled by the `generate-docs.sh` script, which processes each `.schema.ts` file
in the schema directory and uses the `zod2md` library to convert to Markdown. The output Markdown
files are stored in the `docs/` directory.

The Docusaurus site is configured and structured for ["Docs Multi-Instance"](https://docusaurus.io/docs/docs-multi-instance) to host the global docs content, schemas reference, and API reference as distinct sets of documentation (each set is its own plugin). The Schemas reference and API reference are each [versioned](https://docusaurus.io/docs/versioning) independently, while the main docs content is un-versioned. Be sure to adhere to Docusaurus's [recommended practices](https://docusaurus.io/docs/versioning#recommended-practices) for versioning.

## Setup

### Requirements
- [Node.js](https://nodejs.org/) v18.20
- [Docusaurus](https://docusaurus.io/) v3.5

### Install dependences

```bash
$ npm install
```

## Generate Documentation

The `generate-docs.sh` script is used to automate the process of converting Zod schemas into Markdown.

```bash
$ npm run gendocs
```

## Local Development

The following command will start a local development server and open a browser window. Most changes will
be reflected live without needing to restart the server.

```bash
$ npm run start
```

## Deployment

1. Build the static files

    ```bash
    $ npm run build
    ```

2. Serve contents

    ```bash
    $ npm run serve
    ```

## Taging a new version

The following command will create a new version of the specified set of documentation (e.g. `schemas` or `api`) from its respective "current version" files. 

```bash
$ npm run docusaurus docs:version:<pluginId> <new_version>
```

For example, to tag a new version of the `schemas` or `api` docs:

```bash
# Tag schemas doc version 4.4.1
$ npm run docusaurus docs:version:api 4.4.1

# Tag schemas doc version 3.3.0
$ npm run docusaurus docs:version:schemas: 3.3.0
```

### Versioned Docs Multi-Instance File Structure

The default plugin instance, `docs`, contains our global docs content and is unversioned uses these paths:

The `schemas` and `api` plugin instances use these paths:
- `docusaurus/[pluginId]/` - Current Version docs folder
- `docusaurus/sidebars[pluginId].ts` - Current Version sidebar
- `docusaurus/[pluginId]_versions.json` - Lists other versions
- `docusaurus/[pluginId]_versioned_docs/` - Contains other versions docs folders
- `docusaurus/[pluginId]_versioned_sidebars/` - Contains other versions sidebars

## Troubleshooting

To clear the site's generated assets, caches, and build artifacts:
```bash
$ npm run clear
```

Deployment using SSH:
```bash
$ USE_SSH=true yarn deploy
```

Deployment without SSH:
```bash
$ GIT_USER=<Your GitHub username> yarn deploy
```
