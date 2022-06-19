import * as EmailValidator from 'email-validator';
import { NextFunction, Request, Response } from 'express';


class PsRecoveryMiddleware {
  public verifyEmail(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    if(!email) {
      return res.status(400).json({message: '"email" is required!'});
    }
    const valid = EmailValidator.validate(email);
    if(!valid) {
      return res.status(400).json({message: 'Please provide a valid email address.'})
    }
    next();
  }

  public verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if(!password) {
      return res.status(400).json({message: '"password" id required!'});
    }
    if(password.length < 8) {
      return res.status(400).json({message: '"password" must be grater or equal to 8!'});
    }
    next();
  }
}

export default new PsRecoveryMiddleware;