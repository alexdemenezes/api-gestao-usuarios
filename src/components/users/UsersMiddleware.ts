import { Request, Response, NextFunction } from "express";
import * as EmailValidator from 'email-validator';

class UsersMiddleware {
  public isUsernameValid(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;
    if(!username) {
       return res.status(400).json({message: '"username" is required!'});
    }
    if(username.length < 6) {
      return res.status(400).json({message: '"username" must be greater or equal to 6!'});
    }
    next();
  }

  public isEmailValid(req: Request, res: Response, next: NextFunction) {
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

  public isPasswordValid(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if(!password) {
      return res.status(400).json({message: '"password" id required!'});
    }
    if(password.length < 8) {
      return res.status(400).json({message: '"password" must be grater or equal to 8!'});
    }
    next();
  }

  public isAdmin(req: Request, res: Response, next: NextFunction) {
    const { role } = req.body.decoded;
    if(!role){
      return res.status(401).json({message: 'access denied'});
    }
    next();
  }
}

export default new UsersMiddleware;