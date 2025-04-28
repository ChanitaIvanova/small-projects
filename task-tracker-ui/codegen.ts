
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  // generates: {
  //   "src/gql/": {
  //     preset: "client",
  //     plugins: []
  //   },
  //   "./graphql.schema.json": {
  //     plugins: ["introspection"]
  //   }
  // }
};

export default config;
