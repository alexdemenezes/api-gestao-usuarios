import express from 'express';
import { Request, Response } from 'express';
import LoginController from './LoginController';

const router = express.Router()

router.post('/', (req: Request, res: Response) => LoginController.login(req, res));

export default router;