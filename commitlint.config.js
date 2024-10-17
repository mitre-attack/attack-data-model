// commitlint.config.js
export default {
    extends: ['@commitlint/config-conventional'],
    ignores: [
        // Ignore commits starting with "chore(release):" (semantic-release commits)
        (message) => /^chore\(release\):/s.test(message),
    ],
    rules: {
        'body-max-line-length': [0, 'always'], // Disable body max line length rule
    },
};
