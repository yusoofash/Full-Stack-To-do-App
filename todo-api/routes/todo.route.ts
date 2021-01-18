import { Router } from 'express';
import todoController from '../controllers/todo.controller';

const router = Router();

router.post('/', todoController.postTodo);
router.put('/:id', todoController.putTodo);
router.delete('/:id', todoController.deleteTodo);
router.get('/', todoController.getTodos);

export {
    router as todoRouter
};
