import { Router } from 'express';
import { getAll, getById, create, sendMessage, deleteChannel } from '../controllers/channels.controller';
import authJWT from '../middleware/authJwt';

const express = require('express');

const ChannelRouter: Router = express.Router();

ChannelRouter.get('/', authJWT, getAll);
ChannelRouter.get('/:id', authJWT, getById);
ChannelRouter.delete('/:id', authJWT, deleteChannel)
ChannelRouter.post('/', authJWT, create);
ChannelRouter.post('/:id/send_message', authJWT, sendMessage);

export default ChannelRouter;

