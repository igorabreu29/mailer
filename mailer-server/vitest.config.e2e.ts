import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [['src/infra/controllers/**', 'prisma']],
    include: ['**/*.e2e-spec.ts'],
    root: './',
    setupFiles: ['./prisma/prisma-test-environment.ts'],
  }
})