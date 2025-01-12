import { Request, Response } from 'express'
import { createTask, getByIdTask, getAllTask, deleteTask, updateTaskById } from '../services/task.service'

export async function newTask(req: Request, res: Response) {
    try {
        const created = await createTask(req);
        res.status(200).json(created)
    } catch (err) {
        res.status(500).json({ 'Erreur de requete': err })
    }
}

export async function getTaskById(req: Request, res: Response) {
    try {
        const x = await getByIdTask(req);
        res.status(200).json(x)
    } catch (err) {
        res.status(500).json({ 'erreur de requete': err })
    }
}

export async function getTask(req: Request, res: Response) {
    try {
        const x = await getAllTask(req);
        res.status(200).json(x);
    } catch (err) {
        res.status(500).json({ 'erreur de requete': err })
    }
}

export async function deletedTask(req: Request, res: Response) {
    try {
        const x = await deleteTask(req);
        res.status(200).json(x);

    } catch (err) {
        res.status(500).json({ 'erreur de requete': err })
    }
}

export async function updateTask(req: Request, res: Response) {
    try {
        const x = await updateTaskById(req);
        res.status(200).json(x);
    } catch (err) {
        res.status(500).json({ 'erreur de requete': err })
    }
}
