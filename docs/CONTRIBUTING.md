# Contributing to MITRE ATT&CK® Data Model

Thank you for your interest in contributing to the MITRE ATT&CK® Data Model! We welcome contributions from the community to help improve and expand this TypeScript library.

## How to Contribute

We don't have a formal process or Standard Operating Procedure (SOP) for accepting changes. However, there are several ways you can contribute:

1. **Open Issues**: If you encounter bugs or have feature requests, please open an issue using the templates provided below.
2. **Submit Pull Requests**: Feel free to fork the repository, make changes, and submit a pull request. We will review your changes as necessary.

## Issue Templates

### Bug Report

When reporting a bug, please use the following template:

```
## Expected Behavior


## Actual Behavior


## Steps to Reproduce the Problem

  1.
  2.
  3.

## Possible Solution

```

### Feature Request

For feature requests, please use this template:

```
### Is your feature request related to a problem?
Please provide a clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

### Describe the solution you'd like
A clear and concise description of what you want to happen.

### Describe alternatives you've considered
A clear and concise description of any alternative solutions or features you've considered.

### Additional context
Add any other context or screenshots about the feature request here.
```

## Pull Request Guidelines

When submitting a pull request:

1. Fork the repository and create your branch from `main`.
2. Ensure your code adheres to the existing style of the project to maintain consistency.
3. Include comments in your code where necessary.
4. Update the README.md with details of changes to the interface, if applicable.
5. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
6. Include a description of your changes and why they're necessary.

## Developer Setup

### Requirements

- [Node.js](https://nodejs.org/) v18.20

### Install dependences

```bash
npm install
```

## Developer Workflow

To maintain code quality and consistency, we use **ESLint**, **Prettier**, and **Husky** as part of the development workflow. These tools are installed and configured by the [Developer Setup](#developer-setup) steps above. Below is an overview of how each tool is configured and how it affects the contribution process:

### ESLint and Prettier Configuration

- **ESLint**: ESLint is used to enforce code quality rules and catch potential errors in JavaScript and TypeScript. It checks for both syntax issues and best practices.
- **Prettier**: Prettier is used for code formatting to ensure a consistent code style across the entire codebase. Prettier takes care of formatting such as indentation, quotes, and line length.

We use **eslint-config-prettier** to disable any formatting rules in ESLint that might conflict with Prettier. This setup ensures that **ESLint** focuses on code quality while **Prettier** takes care of formatting.

### How They Differ
- **ESLint**: Focuses on finding problematic patterns and enforcing best practices in the code. For example, it catches unused variables, enforces type safety in TypeScript, and flags potential bugs.
- **Prettier**: Focuses solely on formatting code (e.g., indentation, semicolons, line wrapping) without caring about the logic of the code.

### Husky and Git Hooks

- **Husky**: We use Husky to add Git hooks that automate certain tasks before commits and pushes.
- **Pre-Commit Hook**: Husky runs `npm run format` before every commit. This command runs both Prettier and ESLint in fix mode to ensure all code is properly formatted and adheres to linting rules before it is committed.
- **Pre-Push Hook**: Husky also runs `npm run test` before pushing to the repository. This ensures that all tests pass before the code is pushed, preventing broken code from entering the remote branches.
- **Commit-Msg Hook**: Husky also runs `npx --no-install commitlint --edit` before accepting a commit. This ensures that all commit messages adhere to the conventional commit format, thereby keeping semantic-release happy.

These hooks help enforce code quality and consistency across all contributions, making it easier to maintain the project over time.

## Versioning and Release Process

We use semantic-release to manage all aspects of the release process. It automatically determines the next version number, creates git tags, generates release notes, and publishes the package to the GitHub Package Registry for npm artifacts.

### Semantic Release Configuration

We use the default semantic-release configuration, which includes the following plugins (in order of execution):

1. "@semantic-release/commit-analyzer"
2. "@semantic-release/release-notes-generator"
3. "@semantic-release/npm"
4. "@semantic-release/github"

These plugins are part of semantic-release and do not need to be installed separately.

### Release Workflow and Distribution Channels

Our release workflow follows semantic-release's default configuration, which uses different branches for different types of releases and distribution channels:

- Main release channel (`@latest`):
  - Branches: `master`, `main`
  - This is the default channel for stable releases.

- Next release channel (`@next`):
  - Branches: `next`, `next-major`
  - Used for upcoming feature releases or major version changes.

- Maintenance release channels:
  - Branch pattern: `+([0-9])?(.{+([0-9]),x}).x`
  - Example: `2.x` or `2.1.x`
  - Used for maintenance releases of older versions.

- Pre-release channels:
  - Branches: `beta` (`@beta` channel), `alpha` (`@alpha` channel)
  - Used for pre-release versions.

### How It Works

1. **Commit Messages**: When you make changes, use [Conventional Commits](https://www.conventionalcommits.org/) syntax for your commit messages. This helps semantic-release determine the type of changes and the appropriate version increment.

   Examples:
   - `feat: add new attack technique` (triggers a minor version bump)
   - `fix: correct typo in technique description` (triggers a patch version bump)
   - `feat!: rename primary data structure` (triggers a major version bump)

2. **Husky**: We use Husky to enforce compliance with Conventional Commits syntax. It runs a commit message linter before each commit to ensure your messages follow the correct format.

3. **Branching**: Choose the appropriate branch for your work:
   - For regular features and fixes, work on `main`.
   - For major changes or experimental features, use `next` or `next-major`.
   - For bug fixes to older versions, use the appropriate maintenance branch (e.g., `2.x`).
   - For pre-release features, use `beta` or `alpha`.

4. **Pull Requests**: When your changes are ready, create a pull request to the appropriate branch.

5. **Merging**: Once approved and merged, semantic-release takes over:
   - It analyzes the commit messages since the last release.
   - Determines the new version number based on the changes.
   - Creates a new git tag for the release.
   - Generates release notes.
   - Publishes the package to npm with the appropriate dist-tag.

### Examples

1. Regular feature addition:
   - Work on `main` branch
   - Commit with message: `feat: add MITRE ATT&CK v10 techniques`
   - After merge, semantic-release might create version `1.1.0` on the `@latest` channel

2. Critical bug fix:
   - Work on `main` branch
   - Commit with message: `fix: resolve data corruption in technique lookup`
   - After merge, semantic-release might create version `1.1.1` on the `@latest` channel

3. Major breaking change:
   - Work on `next-major` branch
   - Commit with message: `feat!: restructure data model for performance improvements`
   - After merge, semantic-release might create version `2.0.0-next.1` on the `@next` channel

4. Maintenance fix for older version:
   - Work on `1.x` branch
   - Commit with message: `fix: address compatibility issue with Node.js 14`
   - After merge, semantic-release might create version `1.2.1` on a `@release-1.x` channel

### Version Management

The `version` property in `package.json` is not actively tracked. To make it clear to contributors that the version is not kept up to date, we use the value `0.0.0-semantically-released`. For more information on this approach, please refer to the semantic-release [FAQ](https://github.com/semantic-release/semantic-release/blob/master/docs/support/FAQ.md#making-commits-during-the-release-process-adds-significant-complexity).

### Further Reading

For more detailed information on specific release scenarios, please refer to the following example workflows maintained by semantic-release:

- [Publishing on distribution channels](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/distribution-channels.md)
- [Publishing maintenance releases](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/maintenance-releases.md)
- [Publishing pre-releases](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/pre-releases.md)

## Questions?

If you have any questions about contributing, please open an issue and we'll be happy to help!

Thank you for your contributions to make the MITRE ATT&CK® Data Model better for everyone!