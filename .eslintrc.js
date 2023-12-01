module.exports = {
  root: true,
  env: { browser: true, es2021: true, es6: true, jest: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 13,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "import", "@typescript-eslint", "prettier", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: ".css",
            group: "external",
            position: "before",
          },
          {
            pattern: "reactstrap",
            group: "external",
            position: "after",
          },
          {
            pattern: "assets/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/routes",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/types/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/types",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/variables",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/redux/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/redux",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/pages/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/pages",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/hooks/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/hooks",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "react/jsx-key": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],

    "jsx-a11y/click-events-have-key-events": "off",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
