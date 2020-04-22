module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
        'class-methods-use-this': 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
            ],
            env: {
                mocha: true,
            },
        },
    ],
};
