import UsersService from "../users/UsersService";
import { compareSync } from 'bcryptjs';
import JWTGenerator from '../../utils/JWTGenerator';
import status from "../users/types/status";

class LoginService {
  public async verifyCredentials(email: string, password: string): Promise<status> {
    const user = await UsersService.getByEmail(email);
    
    if(user && compareSync(password, user.password) ) {
      const verifiedAccount = user.verified;
      if(verifiedAccount) {
        const token = JWTGenerator.generateToken(email, password, user.role);
        return {status: true, message: 'credentials validated successfully', payload: { token }};
      }
      console.log(verifiedAccount)
      return {status: false, message: 'before you login you have to verify your account'}
    }
    return {status: false, message: 'plese, verify your credentials and try again'}
  } 
}

export default new LoginService;