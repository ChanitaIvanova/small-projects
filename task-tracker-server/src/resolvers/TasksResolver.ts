import { Pagination } from "../models/Pagination";
import { TaskFilter } from "../models/TaskFilter";
import { TaskSort } from "../models/TaskSort";
import { TaskModel } from "../models/Task";
import { ValidationUtil } from "../utils/Validation.util";
import { TaskInput } from "../inputs/TaskInput";
import { AuthenticationError, NotFoundError, AuthorizationError } from "../utils/errors";
import { asyncErrorHandler } from "../utils/ErrorHandler";

const task = async ({ id }: { id: string }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();
    const task = await TaskModel.findById(id);
    if (!task) throw new NotFoundError("Task");
    if (task.owner.toString() !== context.userId) throw new AuthorizationError();
    return task;
}

const tasks = async ({ filter, sort, pagination }: { filter: TaskFilter, sort: TaskSort, pagination: Pagination }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();
    const sortOptions: Record<string, 1 | -1> = {};
    if (sort) {
        sortOptions[sort.field] = sort.order === 'ASC' ? 1 : -1;
    }

    const query: any = {};
    query.owner = context.userId;
    if (filter) {
        if (filter.title) query.title = new RegExp(filter.title, 'i');
        if (filter.description) query.description = new RegExp(filter.description, 'i');
        if (filter.dueDateBefore) query.dueDate = { $lte: filter.dueDateBefore };
        if (filter.dueDateAfter) query.dueDate = { $gte: filter.dueDateAfter };
        if (filter.completed) query.completed = filter.completed;
        if (filter.tags) query.tags = { $in: filter.tags };
    }


    return await TaskModel
        .find(query)
        .sort(sortOptions)
        .limit(pagination?.limit ?? 10)
        .skip(pagination?.offset ?? 0);
};

const createTask = async ({ input }: { input: TaskInput }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();

    ValidationUtil.validateInput(TaskInput, input);

    const task = new TaskModel({
        ...input,
        completed: input.completed ?? false,
        owner: context.userId
    });

    await task.save();
    return task;
}

const updateTask = async ({ id, input }: { id: string, input: TaskInput }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();
    ValidationUtil.validateInput(TaskInput, input);
    const task = await TaskModel.findById(id);
    if (!task) throw new NotFoundError("Task");
    if (task.owner.toString() !== context.userId) throw new AuthorizationError();

    task.title = input.title;
    task.description = input.description;
    task.completed = input.completed;
    task.dueDate = input.dueDate;
    task.tags = input.tags;

    await task.save();
    return task;
}

const deleteTask = async ({ id }: { id: string }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();
    const task = await TaskModel.findById(id);
    if (!task) throw new NotFoundError("Task");
    if (task.owner.toString() !== context.userId) throw new AuthorizationError();
    await task.deleteOne();
    return true;

}

export const taskResolvers = {
    task: asyncErrorHandler(task),
    tasks: asyncErrorHandler(tasks),
    createTask: asyncErrorHandler(createTask),
    updateTask: asyncErrorHandler(updateTask),
    deleteTask: asyncErrorHandler(deleteTask)
};

