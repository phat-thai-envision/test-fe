module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never" },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-underscore-dangle": [
      "error",
      { allow: ["__REDUX_DEVTOOLS_EXTENSION__"] },
    ],
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      1,
      {
        namedComponents: [
          "function-declaration",
          "function-expression",
          "arrow-function",
        ],
        unnamedComponents: ["function-expression", "arrow-function"],
      },
    ],
    "react/jsx-props-no-spreading": [
      1,
      {
        html: "ignore",
        custom: "ignore",
        explicitSpread: "ignore",
        exceptions: ["Image", "img"],
      },
    ],
    "consistent-return": [0],
    "@typescript-eslint/no-explicit-any": [0],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
