import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    tags: string[];
    owner: IUser;
}

const TaskSchema = new Schema<ITask>({
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    tags: [String],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);