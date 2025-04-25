import { buildSchema } from 'graphql';
import { userTypeDefs } from './UsersSchema';
import { taskTypeDefs } from './TasksSchema';

const rootTypes = `
  type Query
  type Mutation
`;

const combinedSchema = `
  ${rootTypes}
  ${userTypeDefs}
  ${taskTypeDefs}
`;

export const schema = buildSchema(combinedSchema);