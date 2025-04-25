import { taskResolvers } from "./TasksResolver";
import { userResolvers } from "./UserResolver";
import { DateTimeResolver } from 'graphql-scalars';

export const resolvers = {
    DateTime: DateTimeResolver,
    ...userResolvers,
    ...taskResolvers,
};