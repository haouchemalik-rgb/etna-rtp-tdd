import { Request, Response } from 'express'
import { deleteSeminary, getByIdSeminary, updateSeminaryById, createSeminary, getAllSeminaries } from '../services/seminaries.service'

export async function newSeminary(req: Request, res: Response) {
    try {
      const neo = await createSeminary(req);
        res.status(200).json(neo.data)
    } catch (err) {
        res.status(500).json({ 'Erreur de requète': err })

    }
}


export async function getSeminaryId(req: Request, res: Response) {
    try {
        const UserbyId = await getByIdSeminary(req);
        res.status(200).json(UserbyId);
    } catch (err) {
        res.status(500).json({ 'Request error': err })
    }

}


export async function Allget(req: Request, res: Response) {
    try {
        const allUser = await getAllSeminaries(req);
        res.status(200).json(allUser.data);
    } catch (err) {
        res.status(500).json({ 'erreur de requète': err })
    }
}

export async function deleteSeminaries(req: Request, res: Response) {
    try {
        const deleted = await deleteSeminary(req);
        res.status(200).json(deleted);

    } catch (err) {
        res.status(500).json({ 'erreur de requète': err })
    }
}

export async function patchSeminary(req: Request, res: Response) {
    try {
        const patched: any = updateSeminaryById(req);
        res.status(200).json(patched)
    } catch (err) {
        res.status(500).json({ 'Erreur de requète': err })
    }
}
