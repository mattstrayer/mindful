/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  env: {
    browser: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    "prefer-const": 0,
    "vue/camelcase": "error",
    "vue/no-deprecated-slot-attribute": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: []
      }
    ]
  }
}
