module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        project: 'tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'promise'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'prettier/@typescript-eslint',
    ],
    rules: {
        // Turn off for perfomance, TS provides same checks
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
        'import/named': 'off',
        'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
        '@typescript-eslint/no-unnecessary-condition': 'warn', // remove once upgraded to v.3 - https://github.com/typescript-eslint/typescript-eslint/issues/1423
        'no-constant-condition': 'warn'
    },
};
