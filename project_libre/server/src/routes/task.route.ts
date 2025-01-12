import { Router } from 'express'
import { newTask, getTaskById, getTask, deletedTask, updateTask} from '../controllers/task.controller'
const express = require('express');

const taskRouter: Router = express.Router();

taskRouter.get('/', getTask);
taskRouter.get('/:id', getTaskById);
taskRouter.patch('/:id', updateTask);
taskRouter.post('/', newTask);
taskRouter.delete('/', deletedTask);

export default taskRouter