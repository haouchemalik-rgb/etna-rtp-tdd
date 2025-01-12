import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');

function authJWT(req: Request, res: Response, next: NextFunction) {
  // recovery of the token in header without the bearer
  const token = req.cookies.access_token;

  // verification of the existence of the token
  if (!token) {
    res.status(403).json({
      message: 'No token found',
    });
  } else {
    // verification of the validity of the token thanks to the public key
    jwt.verify(token, process.env.SECRET_KEY, (err: any, data: any) => {
      if (err) {
        res.status(403).json({
          message: `Sorry, there seems to be an error: ${err}`,
        });
      } else {
        req.body.data = data;
        next();
      }
    });
  }
}

export default authJWT;
