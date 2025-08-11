# Running and Writing Tests

The project uses **[Vitest](https://vitest.dev/)**.

## Execute the full suite

```bash
npm test
```

## Watch mode

```bash
npm run test:interactive
```

Vitest is configured in `vitest.config.ts` with:

- Node environment
- Global `describe/it/expect`
- Path alias `@` → `./src`

## Coverage

```bash
npm run test:coverage
```

Coverage reports are not required for PRs but strongly encouraged for new functionality.

## Test helpers

- `test/vitest.setup.ts` – global test framework setup

When adding new schemas or refinement logic:

1. Write **positive** test cases (`schema.parse` passes)
2. Write **negative** test cases that assert specific error messages
