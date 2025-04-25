export const taskTypeDefs = `
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    description: String
    dueDate:  DateTime
    completed: Boolean!
    tags: [String!]!
    owner: String!
  }

  input TaskInput {
    title: String!
    description: String
    dueDate: DateTime
    completed: Boolean
    tags: [String!]!
  }

  input TaskFilter {
    title: String
    description: String
    dueDateBefore: DateTime
    dueDateAfter: DateTime
    completed: Boolean
    tags: [String!]
  }

  enum SortOrder {
    ASC
    DESC
  }

  input TaskSort {
    field: String!
    order: SortOrder!
  }

  input Pagination {
    limit: Int  
    offset: Int
  }

  extend type Query {
    tasks(filter: TaskFilter, sort: TaskSort, pagination: Pagination): [Task!]!
    task(id: ID!): Task
  }

  extend type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Boolean
  }
`;