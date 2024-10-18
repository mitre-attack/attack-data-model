# ATT&CK Data Model Documentation

This repository contains the automated documentation for the ATT&CK Data Model. The project
leverages Zod schemas, defined in `zod/schemas/`, to generate Markdown files that are processed
and served as static documentation using [Docusaurus](https://docusaurus.io/).

The automation is handled by the `generate-docs.sh` script, which processes each `.schema.ts` file
in the schema directory and uses the `zod2md` library to convert to Markdown. The output Markdown
files are stored in the `docs/` directory.

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
$ npm run autodocs
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
