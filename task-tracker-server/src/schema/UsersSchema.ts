export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
  }
`;