import { Router } from 'express';
import { todoRouter } from './todo.route';

const router = Router();

router.use('/todo', todoRouter);

export {
    router as apiRouter
};
