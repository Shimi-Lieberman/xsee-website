import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "metronic-v9.4.7/**",
    "scripts/**",
    // Static design reference, not compiled into the app: these .jsx files are
    // standalone excerpts with intentionally unresolved imports.
    "design_handoff_xsee_v2/**",
  ]),
]);

export default eslintConfig;
