import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UsersMiddleware from '../users/UsersMiddleware';
import LoginController from './LoginController';


const router = express.Router()

router.post(
  '/', 
  (req: Request, res: Response, next: NextFunction) =>  UsersMiddleware.isEmailValid(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isPasswordValid(req, res, next),
  (req: Request, res: Response) => LoginController.login(req, res));

export default router;