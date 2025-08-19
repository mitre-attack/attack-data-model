# Development Setup

Follow these steps to get the ADM codebase running on your local machine.

## Clone and install

```bash
git clone https://github.com/mitre-attack/attack-data-model.git
cd attack-data-model
npm install
```

💡 The repo is a multi-package workspace (core library + docusaurus site).
Running `npm install` at the root will NOT install the dependencies for building the docs.
Check out the [documentation](docs) contribution guide for more details.

## Verify TypeScript build

```bash
npm run build  # compiles src → dist using tsup
npm run test   # vitest tests
```

## Handy npm scripts

| Script | Purpose |
|---|---|
| npm run lint | Lints all `src/**` files |
| npm run format | Prettier + ESLint fix |
| npm run test | Run tests |

You are now ready to hack on the library.
Continue with [Coding Style & Linting](coding-style.md) for the mandatory style rules.
