import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface TodoModel extends Document {
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const todoSchema = new Schema({
    text: { type: String }
}, { timestamps: true });

const Todo = mongoose.model<TodoModel>('Todo', todoSchema);
export default Todo;
