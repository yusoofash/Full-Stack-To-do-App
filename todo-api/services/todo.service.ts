import { APIError } from "../classes/APIError";
import { GetTodoResponse, PostTodoRequest, PutTodoRequest } from "../dto/todo.dto";
import Todo, { TodoModel } from "../models/Todo.model";

const insertTodo = async (data: PostTodoRequest) => {
    // validations
    if (!data || !data.text) {
        throw new APIError(400, { message: 'Please provide the text' });
    }

    const todo = new Todo;
    todo.text = data.text;
    return await todo.save();
};

const updateTodo = async (data: PutTodoRequest) => {
    // validations
    if (!data || !data.text) {
        throw new APIError(400, { message: 'Please provide the text' });
    }

    const dbTodo = await Todo.findOne({ _id: data._id });
    if (!dbTodo) {
        throw new APIError(404, { message: 'Todo item not found' });
    }

    dbTodo.text = data.text;
    await dbTodo.save();
};

const deleteTodo = async (_id: string) => {
    const dbTodo = await Todo.findOne({ _id });
    if (!dbTodo) {
        throw new APIError(404, { message: 'Todo item not found' });
    }

    await Todo.deleteOne({ _id });
};

const showTodos = async (): Promise<GetTodoResponse[]> => {
    const dbTodos = await Todo.find({}).sort('-createdAt');
    return mapTodoResponse(dbTodos);
};

const mapTodoResponse = (arr: TodoModel[]): GetTodoResponse[] =>
    arr.map(obj => ({
        _id: obj._id,
        text: obj.text,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
    }));

export default {
    insertTodo,
    updateTodo,
    deleteTodo,
    showTodos,
};