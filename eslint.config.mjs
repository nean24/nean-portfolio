// eslint.config.mjs
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // Node 20.11+ has import.meta.dirname
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

export default [
  // Next.js presets (via compat)
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
]
