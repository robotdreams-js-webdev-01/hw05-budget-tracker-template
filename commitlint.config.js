module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow only specific commit types (add/remove as needed)
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],

    // Enforce lowercase for the type (e.g., 'feat' not 'FEAT')
    'type-case': [2, 'always', 'lower-case'],

    // Require a subject (the part after the colon)
    'subject-empty': [2, 'never'],

    // Example: Disable scope requirement (set to 0 to ignore)
    'scope-empty': [0, 'always'],

    // Add custom rules here, e.g., for Jira ticket references
    // 'references-empty': [2, 'never'], // Require references like 'ABC-123'
  },
};
