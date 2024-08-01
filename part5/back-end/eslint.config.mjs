# import globals from "globals";
# import pluginJs from "@eslint/js";
# 
# export default [
#   {
#     rules: {
#       semi: ["error", "always"], // Prohibit semicolons
#       "prefer-const": "error",
#       quotes: ["error", "double"],
#     },
#   },
# 
#   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
#   { languageOptions: { globals: globals.jest } },
#   pluginJs.configs.recommended,
#   {
#     files: ["**/*.test.js"],
#     env: {
#       jest: true,
#     },
#   },
# ];

import globals from "globals";
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    jest: true,  // This sets up the Jest global variables
  },
  plugins: ['jest'],
   { languageOptions: { globals: globals.jest } },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',  // This uses recommended settings for Jest
  ],
    rules: {
      semi: ["error", "always"], // Prohibit semicolons
      "prefer-const": "error",
      quotes: ["error", "double"],
    }
});
