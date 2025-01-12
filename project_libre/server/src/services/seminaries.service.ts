import { Request, Response } from 'express'
import Seminary from '../database/models/Seminary'

export async function createSeminary(req: Request) {
    const newCreate = await Seminary.create(req.body)
    return {
        err: false,
        data: newCreate
    }
}

export async function getByIdSeminary(req: Request) {
    const seminary = await Seminary.findAll({
        where: {
            id: req.params.id,
        }
    });
    return {
        err: false,
        data: seminary,
    }
}

export async function getAllSeminaries(req: Request) {
    const seminary = await Seminary.findAll();
    return  {
        err: false,
        data: seminary,
    }
}

export async function deleteSeminary(req: Request) {
    const { id } = req.params;
   const deletedSeminary = await Seminary.destroy({
    where: {
        id,
    },
   })
   return {
    err : false,
    data: deletedSeminary
   }
}


export async function updateSeminaryById(req: Request) {
    const { id } = req.params;
    const update = await Seminary.update(req.body, {
      where: {
        id,
      },
    });
    return  {
        err: false,
        data: update,
    };
  }




