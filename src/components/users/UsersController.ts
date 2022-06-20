import {Response, Request } from 'express';
import UsersService from './UsersService';

class UsersController {
  public async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await UsersService.getAll();
      return res.status(200).json(users );
    } catch (error) {
      return res.status(500).json({message: 'internal error'})
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UsersService.getById(+id);
    if(!user) {
      return res.status(404).json({ message: 'user not found'})
    } 
    return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({message: 'internal error'})
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await UsersService.create(req.body);
      if(!result.status) {
        return res.status(409).json({ message: result.message});
      }
      return res.status(200).json({message: result.message});
    } catch (e) {
      return res.status(500).json({message: 'internal error'})
    }
  }

  public async createAdmin(req: Request, res: Response): Promise<Response> {
      const result = await UsersService.createAdmin(req.body);
      if(result.message !== 'internal error') {
        return res.status(201).json({message: result.message});
      }
      return res.status(500).json({message: result.message});
  }

  public async validateAccount(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    try {
      if (token && typeof token === 'string' ) {
        const result = await UsersService.validateAccount(token);
        if(!result.status) {
          return res.status(404).json({message: result.message});
        }
        return res.status(200).send({message: result.message});
      }
      return res.status(400).json({message: 'token not found'});
    } catch (e) {
      return res.status(500).json({message: 'internal error'});
    }
  }

  public async updateUsername(req: Request, res: Response): Promise<Response> {
      const { username } = req.body;
      const { email } = req.body.decoded;
    
      const result = await UsersService.updateUsername(email, username);
      if(!result.status && result.message === 'internal error') {
        return res.status(500).json({message: result.message});
      }
      if (result.message == 'Username already exist') {
        return res.status(409).json({message: result.message})
      }
      return res.status(200).json({message: result.message});
  }

  public async updatePassword(req: Request, res: Response) : Promise<Response> {
    const { password } = req.body;
    const { email } = req.body.decoded;
    const result = await UsersService.updatePassword(email, password);
    if(!result.status && result.message === 'internal error') {
      return res.status(500).json({message: result.message});
    }
    return res.status(200).json({message: result.message});
  }

  public async adminDelete(req: Request, res: Response): Promise<Response> {
    const {id } = req.params;
    const result = await UsersService.adminDelete(+id);
    if(result.status) {
      return res.status(200).json({message: result.message});
    }
    if(!result.status && result.message === 'user not found') {
      return res.status(404).json({ message: result.message});
    }
    return res.status(500).json({ message: result.message});
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.decoded;
    try {
      const result = await UsersService.delete(email);

      if(result.status) {
        return res.status(200).json({message: result.message});
      }
      return res.status(500).json({ message: result.message});
    } catch (e) {
      return res.status(500).json({ message: 'internal error'});
    }
  }
}

export default new UsersController;