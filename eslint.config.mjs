import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    // Pin the React version rather than inheriting eslint-config-next's "detect".
    // Detection routes through eslint-plugin-react's resolveBasedir, which calls the
    // context.getFilename() that eslint 10 removed. Bump this when React majors move.
    settings: { react: { version: "19.2.0" } },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // eslint-config-next 16 ships these as warnings; keep them failing as before
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": "error",
    },
  },
]

export default eslintConfig
