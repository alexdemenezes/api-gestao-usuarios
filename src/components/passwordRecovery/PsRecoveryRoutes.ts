import express from 'express';
import { Request, Response, NextFunction} from 'express';
import PsRecoveryMiddleware from './PsRecoveryMiddleware';
import PsRecoveryController from './PsRecoveryController';

const router = express.Router();

router.post(
  '/', 
  (req: Request, res: Response, next: NextFunction) => PsRecoveryMiddleware.verifyEmail(req, res, next),
  (req: Request, res: Response) => PsRecoveryController.recovery(req, res),
)

router.post(
  '/:token',
  (req: Request, res: Response, next: NextFunction) => PsRecoveryMiddleware.verifyPassword(req, res, next),
  (req: Request, res: Response) => PsRecoveryController.updatePassword(req, res),
)

export default router;