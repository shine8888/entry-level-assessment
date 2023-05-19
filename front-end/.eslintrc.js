module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['react', '@babel', '@typescript-eslint'],
  settings: {
    react: {
      version: '17',
    },
  },
  rules: {
    // allow specifying true explicitly for boolean props
    'react/jsx-boolean-value': ['error'],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error'],
    'react/display-name': 0,
    'node/no-callback-literal': 0,
    // Allow free standing if clauses
    curly: 0,
    // Enforce consistend <></> Fragment syntax, unless keyed
    'react/jsx-fragments': ['error', 'syntax'],
    // Disable jsx uses react, not needed with react 17
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    /* [Typescript overrides] */
    // note you must disable the base rule as it can report incorrect errors,
    // using TS no unused vars instead
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-cycle': 'warn',
  },
};
