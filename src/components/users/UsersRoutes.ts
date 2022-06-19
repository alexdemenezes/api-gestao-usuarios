import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UsersController from './UsersController';
import UsersMiddleware from './UsersMiddleware';
import AuthMiddleware from '../auth/AuthMiddleware';


const router = express.Router();

router.get('/validate', (req: Request, res: Response) => UsersController.validateAccount(req, res));

router.get('/', (req: Request, res: Response) => UsersController.getAll(req, res));

router.get('/:id', (req: Request, res: Response) => UsersController.getById(req, res));

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) =>  UsersMiddleware.isEmailValid(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isUsernameValid(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isPasswordValid(req, res, next),
  (req: Request, res: Response) => UsersController.create(req, res));

router.post(
  '/admin',
  (req:Request, res: Response, next: NextFunction) => AuthMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isAdmin(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>  UsersMiddleware.isEmailValid(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isUsernameValid(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isPasswordValid(req, res, next),
  (req: Request, res: Response) => UsersController.createAdmin(req, res));


router.patch(
  '/username',
(req:Request, res: Response, next: NextFunction) => AuthMiddleware.verifyToken(req, res, next),
(req: Request, res: Response, next: NextFunction) => UsersMiddleware.isUsernameValid(req, res, next),
(req: Request, res: Response) => UsersController.updateUsername(req, res));

router.patch(
  '/password', 
  (req: Request, res: Response, next: NextFunction) => AuthMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isPasswordValid(req, res, next),
  (req: Request, res: Response) => UsersController.updatePassword(req, res),
);

router.delete(
  '/', 
  (req: Request, res: Response, next: NextFunction) => AuthMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response) => UsersController.delete(req, res)); 

// router.delete(
//   '/admin/:id',
//   (req: Request, res: Response, next: NextFunction) => AuthMiddleware.verifyToken(req, res, next),
//   (req: Request, res: Response, next: NextFunction) => UsersMiddleware.isAdmin(req, res, next),
//   (req: Request, res: Response) => UsersController.adminDelete(req, res)); 
  

export default router;
