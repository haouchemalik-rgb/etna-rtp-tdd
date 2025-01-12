import { Request } from 'express'
import Task from '../database/models/Task'

export async function createTask(req: Request) {
    const newCreate = await Task.create(req.body)
    return {
        err: false,
        data: newCreate
    }
}

export async function getByIdTask(req: Request) {
    const task = await Task.findAll({
        where: {
            id: req.params.id,
        }
    });
    return {
        err: false,
        data: task,
    }
}

export async function getAllTask(req: Request) {
    const task = await Task.findAll();
    return  {
        err: false,
        data: task,
    }
}

export async function deleteTask(req: Request) {
    const { id } = req.params;
    const deletedTask = await Task.destroy({
        where: {
            id,
        }
    })
    return {
        err: false,
        data: deletedTask,
    }
}


export async function updateTaskById(req: Request) {
    const { id } = req.params;
    const update = await Task.update(req.body, {
      where: {
        id,
      },
    });
    return  {
        err: false,
        data: update,
    };
  }

  

