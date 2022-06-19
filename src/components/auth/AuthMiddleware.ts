 import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config'; 

 class AuthMiddleware {
  public verifyToken(req: Request, res: Response, next: NextFunction ) {
    const { authorization: token } = req.headers;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        req.body.decoded = decoded;
        next();
      } catch (e) {
        return res.status(401).json({message: 'token is invalid or expired'})
      }
    } else {
      return res.status(401).json({message: 'token is required!'})
    }
  } 
 }

 export default new AuthMiddleware;