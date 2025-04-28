import { gql } from "@apollo/client"
export const GET_TASK = gql`
query Task($taskId: ID!) {
  task(id: $taskId) {
    completed
    description
    dueDate
    id
    owner
    tags
    title
  }
}
`
export const GET_TASKS = gql`
query Tasks($filter: TaskFilter, $sort: TaskSort, $pagination: Pagination) {
  tasks(filter: $filter, sort: $sort, pagination: $pagination) {
    completed
    description
    dueDate
    id
    owner
    tags
    title
  }
}
`
export const DELETE_TASK = gql`
mutation DeleteTask($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId)
}
`

export const CREATE_TASK = gql`
mutation CreateTask($createTaskInput: TaskInput!) {
  createTask(input: $createTaskInput) {
    completed
    description
    dueDate
    id
    owner
    tags
    title
  }
}
`

export const UPDATE_TASK = gql`
mutation UpdateTask($updateTaskId: ID!, $input: TaskInput!) {
  updateTask(id: $updateTaskId, input: $input) {
    completed
    description
    dueDate
    id
    owner
    tags
    title
  }
}
`