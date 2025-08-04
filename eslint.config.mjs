import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
    },

    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    eslintPluginPrettierRecommended,

    {
        languageOptions: {
            sourceType: 'module',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    {
        plugins: {
            import: eslintPluginImport,
            'simple-import-sort': simpleImportSort,
        },

        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^(assert|buffer|child_process|cluster|crypto|fs|http|https|net|os|path|process|stream|timers|tty|url|util|zlib)(/.*|$)'],
                        ['^@?\\w'],
                        ['^@/'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',

            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],
            'import/no-unresolved': ['error', { ignore: ['^jsx$', '^jsx/', '^@/'] }],

            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],

            '@typescript-eslint/member-ordering': ['error', {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                ],
            }],

            '@typescript-eslint/explicit-member-accessibility': ['error', {
                accessibility: 'explicit',
            }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',

            '@typescript-eslint/naming-convention': ['error', {
                selector: 'method',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            }],
        },

        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
    }
);
