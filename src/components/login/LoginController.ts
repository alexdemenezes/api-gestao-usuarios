import {Request, Response} from 'express'
import LoginService from './LoginService'

class LoginController {
  public async login(req: Request, res: Response) {
    const {email, password} = req.body;
    try {
      const result = await LoginService.verifyCredentials(email, password);
      if(result.status && result.payload) {
        const { token } = result.payload;
        return res.status(200).json({ message: result.message, token })
      }
      return res.status(401).json({ message: result.message });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' })
    }
  }
}

export default new LoginController;