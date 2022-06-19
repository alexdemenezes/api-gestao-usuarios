import { Request, Response, NextFunction } from 'express';


class LoginMiddleware {
  public isVerified(req: Request, res: Response, next: NextFunction): Response | void {
    const { verified } = req.body.params;

    if(!verified) {
      return res.status(401).json({message: "you must verify your account before you proceed"});
    }
    next();
  }
}
export default new LoginMiddleware;