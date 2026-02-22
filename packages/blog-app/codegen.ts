import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../api/internal/transport/graphql/schemas/*.graphqls',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/types.ts': {
      plugins: ['typescript'],
    },
    './src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'gql/types.ts',
      },
      plugins: ['typescript-operations'],
    },
  },
}

export default config
