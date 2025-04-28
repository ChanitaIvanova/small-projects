import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  deleteTask?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: TaskInput;
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  filter?: InputMaybe<TaskFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<TaskSort>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  completed: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  owner: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type TaskFilter = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDateAfter?: InputMaybe<Scalars['DateTime']['input']>;
  dueDateBefore?: InputMaybe<Scalars['DateTime']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type TaskSort = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type TaskQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type TaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', completed: boolean, description?: string | null, dueDate?: any | null, id: string, owner: string, tags: Array<string>, title: string } | null };

export type TasksQueryVariables = Exact<{
  filter?: InputMaybe<TaskFilter>;
  sort?: InputMaybe<TaskSort>;
  pagination?: InputMaybe<Pagination>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', completed: boolean, description?: string | null, dueDate?: any | null, id: string, owner: string, tags: Array<string>, title: string }> };

export type DeleteTaskMutationVariables = Exact<{
  deleteTaskId: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: boolean | null };

export type CreateTaskMutationVariables = Exact<{
  createTaskInput: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', completed: boolean, description?: string | null, dueDate?: any | null, id: string, owner: string, tags: Array<string>, title: string } | null };

export type UpdateTaskMutationVariables = Exact<{
  updateTaskId: Scalars['ID']['input'];
  input: TaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', completed: boolean, description?: string | null, dueDate?: any | null, id: string, owner: string, tags: Array<string>, title: string } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: string } | null };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', email: string, id: string } } | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', email: string, id: string } } | null };


export const TaskDocument = gql`
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
    `;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useTaskQuery(baseOptions: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables> & ({ variables: TaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
      }
export function useTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
        }
export function useTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TaskQuery, TaskQueryVariables>(TaskDocument, options);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskSuspenseQueryHookResult = ReturnType<typeof useTaskSuspenseQuery>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
export const TasksDocument = gql`
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
    `;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export function useTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<typeof useTasksSuspenseQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($deleteTaskId: ID!) {
  deleteTask(id: $deleteTaskId)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      deleteTaskId: // value for 'deleteTaskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const CreateTaskDocument = gql`
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
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      createTaskInput: // value for 'createTaskInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
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
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateTaskId: // value for 'updateTaskId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(input: $registerInput) {
    token
    user {
      email
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(input: $loginInput) {
    token
    user {
      email
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;