import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts'

export default defineConfig({
  client: {
    bundle: true,
    name: '@hey-api/client-axios',
  },
  input: 'http://localhost:3000/docs-yaml',
  output: 'src/api',
  experimentalParser: true,
  plugins: [...defaultPlugins, 'zod'],
})
