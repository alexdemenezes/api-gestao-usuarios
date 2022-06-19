import PsRecoveryService from "./PsRecoveryService";
import { Request, Response }  from 'express';

class PsRecoveryController {
 public async recovery(req: Request, res: Response): Promise<Response> {
  const {email} =req.body;
  const result = await PsRecoveryService.recovery(email);

  if(!result.status && result.message === 'user not found') {
    return res.status(404).json({message: result.message});
  }
  if(!result.status && result.message === 'internal error') {
    return res.status(500).json({message: result.message});
  }
  if(!result.status && result.message === 'token has been already used') {
    return res.status(401).json({ message: result.message})
  }
  return res.status(200).json({message: result.message});
 }

 public async updatePassword(req: Request, res: Response): Promise<Response> {
  const { token } = req.params;
  const { password } = req.body;
  const result = await PsRecoveryService.updatePassword(token, password);
  if(!result.status) {
    return res.status(500).json({ message: 'internal erorr'});
  }
  return res.status(200).json({message: result.message});
 }
}

export default new PsRecoveryController;