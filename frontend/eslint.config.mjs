import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ігнорування використання 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // Дозвіл невикористаних змінних (тільки якщо вони починаються з '_')
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      // Ігнорування залежностей у useEffect
      "react-hooks/exhaustive-deps": "off",

      // Дозвіл використання <img> замість <Image>
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
