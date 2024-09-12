module.exports = {
  extends: [
    "expo",
    "airbnb",
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: [
    "react",
    "react-native",
    "@typescript-eslint",
    "@typescript-eslint/eslint-plugin",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    "react-native/react-native": true,
  },
  rules: {
    quotes: [2, "single"],
    semi: [2, "never"],
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "max-len": "off",
    "@typescript-eslint/ban-types": "off",
    "react-native/no-inline-styles": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "no-use-before-define": "off",
    "react-native/no-color-literals": "off",
    "react/require-default-props": "off",
    "react-native/no-raw-text": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-danger": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-require-imports": "off",
    "react/no-unstable-nested-components": "off",
    "global-require": "off",
  },
  overrides: [
    {
      files: ["babel.config.js", "metro.config.js", "jest.config.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "func-names": "off",
      },
    },
  ],
};
