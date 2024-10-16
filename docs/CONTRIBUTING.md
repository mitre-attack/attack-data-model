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

## Developer Workflow

To maintain code quality and consistency, we use **ESLint**, **Prettier**, and **Husky** as part of the development workflow. Below is an overview of how each tool is configured and how it affects the contribution process:

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

These hooks help enforce code quality and consistency across all contributions, making it easier to maintain the project over time.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For version bumps, use the following npm commands:

### For pre-release versions (e.g., 1.0.0-rc.0):
- To increment to the next pre-release (e.g., 1.0.0-rc.1): `npm version prerelease`
- To bump to the release version (e.g., 1.0.0): `npm version minor` (or `npm version major` if it's a major release)

### For release versions (e.g., 1.0.0):
- To bump the patch version (e.g., 1.0.0 to 1.0.1): `npm version patch`
- To bump the minor version (e.g., 1.0.0 to 1.1.0): `npm version minor`
- To bump the major version (e.g., 1.0.0 to 2.0.0): `npm version major`

Please ensure you update the version number appropriately with your changes.

## Questions?

If you have any questions about contributing, please open an issue and we'll be happy to help!

Thank you for your contributions to make the MITRE ATT&CK® Data Model better for everyone!