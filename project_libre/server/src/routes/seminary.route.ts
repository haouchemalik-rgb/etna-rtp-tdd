import { Router }  from 'express';
import { newSeminary, getSeminaryId, Allget, deleteSeminaries, patchSeminary } from '../controllers/seminaries.controller'
const express = require('express');

const seminaryRouter: Router = express.Router()

seminaryRouter.get('/', Allget);
seminaryRouter.get('/:id', getSeminaryId);
seminaryRouter.patch('/:id', patchSeminary);
seminaryRouter.delete('/:id', deleteSeminaries);
seminaryRouter.post('/', newSeminary);


export default seminaryRouter;

