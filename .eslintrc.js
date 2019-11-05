module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
    "prettier/prettier": "error"
  }
};
