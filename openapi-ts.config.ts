import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts'

export default defineConfig({
  client: {
    bundle: true,
    name: '@hey-api/client-axios',
  },
  input: 'http://localhost:3000/docs-yaml',
  output: 'src/api',
  experimentalParser: true,
  plugins: [
    ...defaultPlugins,
    'zod',
    {
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
      // This should be false. Is injecting zod. And zod is stripping off values.
      validator: false,
      asClass: true,
    },
  ],
})
