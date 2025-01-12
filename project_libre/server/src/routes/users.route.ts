import { Router } from 'express';
import {
  addToChannel,
  checkPass,
  deleteById, getAll,
  getById, jwtData, login, logout, register,
  removeFromChannel,
  updateById,
} from '../controllers/users.controller';
import authJWT from '../middleware/authJwt';

const express = require('express');

const UserRouter: Router = express.Router();

UserRouter.get('/jwtData', authJWT, jwtData);
UserRouter.get('/checkPass/:id', authJWT, checkPass)
UserRouter.get('/logout', authJWT, logout);
UserRouter.get('/', getAll);
UserRouter.get('/:id', getById);
UserRouter.patch('/:id', authJWT, updateById);
UserRouter.delete('/:id', authJWT, deleteById);
UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.post('/:id/addchannel/:channelId', authJWT, addToChannel)
UserRouter.post('/:id/removechannel/:channelId', authJWT, removeFromChannel)

export default UserRouter;

