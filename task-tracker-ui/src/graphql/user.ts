import { gql } from "@apollo/client"
export const GET_CURRENT_USER = gql`
query Me {
  me {
    email
    id
  }
}
`
export const REGISTER = gql`
mutation Register($registerInput: RegisterInput!) {
  register(input: $registerInput) {
    token
    user {
      email
      id
    }
  }
}
`
export const LOGIN = gql`
mutation Login($loginInput: LoginInput!) {
  login(input: $loginInput) {
    token
    user {
      email
      id
    }
  }
}
`
