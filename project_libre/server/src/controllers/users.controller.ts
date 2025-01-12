import { Request, Response } from 'express';
import { 
  getByIdUsers, getAllUsers,
  registerUser, deleteUser,
  updateUser, loginUser,
  checkPassUser, addUserToChannel, removeUserFromChannel
} from '../services/users.service';

const jwt = require('jsonwebtoken');

async function getById(req: Request, res: Response) {
  await getByIdUsers(req)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

async function getAll(req: Request, res: Response) {
  await getAllUsers()
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}

async function updateById(req: Request, res: Response) {
  await updateUser(req)
    .then((data) => {
      if (!data.err) {
        res.status(200).json({message: data.data});
      } else {
        res.status(400).json({message: data.data});
      }
    })
    .catch(() => {
      res.status(500).json({message: 'Resource not updated'});
    })
}

async function deleteById(req: Request, res: Response) {
  await deleteUser(req)
    .then((data) => {
      res.status(200).json({message: data.data});
    })
    .catch(() => {
      res.status(500).json({message: 'Resource not deleted'});
    });
}



async function register(req: Request, res: Response) {
  await registerUser(req)
    .then((data) => {
      if (!data.err) {
        res.status(201).json({message: data.data});
      } else {
        res.status(400).json({message: data.data});
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    })
}

async function login(req: Request, res: Response) {
  await loginUser(req)
    .then((data) => {
      if (!data.err) {
        res
          .cookie('access_token', data.data, {
            httpOnly: true,
            maxAge: 1000 * 3600 * 24,
          })
          .status(200)
          .json({
            message : 'Logged in successfully',
          });
      } else {
        res.status(403).json({message: data.data})
      }
    })
    .catch((error) => {
      res.status(500).json({message: 'Request error'});
    })
}

function logout (req: Request, res: Response) {
  res.clearCookie('access_token').status(200).json({
    message: 'Logged out successfully',
  })
}

async function checkPass(req: Request, res: Response) {
  await checkPassUser(req)
    .then((data) => {
      if (!data.err) {
        res.status(200).json({
          message: data.data,
        });
      } else {
        res.status(403).json({
          message: data.data,
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    }); 
}

function jwtData(req: Request, res: Response) {
  const token = req.cookies.access_token;
  const tokenDecoded = jwt.decode(token);
  res.status(200).json({
    id: tokenDecoded.id,
  });
}

async function addToChannel(req: Request, res: Response) {
  const user = await addUserToChannel(req.params.id, req.params.channelId);

  if (user.err) {
    res.status(500).send({message: user.data});
  } else {
    res.status(200).json(user);
  }
}

async function removeFromChannel(req: Request, res: Response) {
  await removeUserFromChannel(req.params.id, req.params.channelId)
    .then((data) => {
      if (!data.err) {
        res.status(200).json({message: data.data});
      } else {
        res.status(400).json({message: data.data});
      }
    })
    .catch((err) => {
      res.status(500).json({message: 'Request Error'})
    })
}

export {
  getById, getAll,
  register, deleteById,
  updateById, login,
  logout, checkPass,
  jwtData, addToChannel, removeFromChannel,
}
