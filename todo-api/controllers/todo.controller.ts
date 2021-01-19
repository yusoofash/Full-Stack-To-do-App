import { Request, Response, NextFunction } from 'express';
import todoService from '../services/todo.service';

const postTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedTodo = await todoService.insertTodo(req.body);
        res.json(savedTodo);
    } catch (err) {
        next(err);
    }
};

const putTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await todoService.updateTodo({
            _id: req.params.id,
            ...req.body,
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await todoService.deleteTodo(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoServices = await todoService.showTodos();
        res.json(todoServices);
    } catch (err) {
        next(err);
    }
};

export default {
    postTodo,
    putTodo,
    deleteTodo,
    getTodos,
};
