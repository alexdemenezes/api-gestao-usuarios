import jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';


class JWTGenerator {
  private _SECRET: Secret;
  private _JWTConfig: SignOptions;

  constructor() {
    this._SECRET = process.env.JWT_SECRET || '';
    this._JWTConfig = {
      expiresIn: '2h',
      algorithm: 'HS256',
    }
  }

  public generateToken(email: string, password: string, role: number): string {
    const data = {
      email,
      password,
      role,
    };
    const token = jwt.sign(data, this._SECRET, this._JWTConfig); 
    return token;
  }
}

export default new JWTGenerator();