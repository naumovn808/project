module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:node/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
        'node',
        'import',
        'jsx-a11y',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-console': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
};