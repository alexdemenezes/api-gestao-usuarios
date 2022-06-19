import User from '../users/User';
import PsRecovery from './PsRecovery'
import UUIDGenerator from '../../utils/UUIDGenerator';
import EmailSender from '../../utils/EmailSender';
import HashGenerator from '../../utils/HashGenerator';

class PsRecoveryService {
  public async recovery(email: string) {
    try {
      const user = await User.findOne({
        where: {
          email,
        }
      });

      if(!user) {
        return { status: false, message: 'user not found'}
      }
      const token =  UUIDGenerator.generate()
      await PsRecovery.create({
        token,
        userId: user.id,
      });
       await EmailSender.send(email, token, 'recovery password');
       return { status: true, message: 'a recovery email address will be sent to the address you provided'}
    } catch (e) {
      console.log(e);
      return {status: false, message: 'internal error'}
    }
  }
  
  public async updatePassword(token: string, newPassword: string) {
    try {
      const ps = await PsRecovery.findOne({
        where: {
          token,
        }
      });

      if (ps?.used) {
       return { status: false, message: 'token has been already used'}
      }

      const hash = HashGenerator.passwordToHash(newPassword)

      await User.update({
        password: hash,
      }, {
        where: {
          id: ps?.user_id
        }
      });

      await PsRecovery.update({
        used: 1,
      }, {
        where: {
          token,
        }
      });

      return { status: true, message: 'password updated successfully'}
    } catch (e) {
      console.log(e);
      return { status: false, message: 'internal error'};
    }
  }
}

export default new PsRecoveryService;