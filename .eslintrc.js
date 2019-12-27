module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": [ // import/extensions のエラー対応
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  },
  settings: {
    "import/resolver": { // import/no-unresolved のエラー対応
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
