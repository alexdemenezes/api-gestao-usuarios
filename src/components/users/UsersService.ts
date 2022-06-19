import HashGenerator from '../../utils/HashGenerator';
import UUIDGenerator from '../../utils/UUIDGenerator';
import EmailSender from '../../utils/EmailSender';
import User from './User';
import status from './types/status';
import userData from './types/userData';


class UsersService {

  public async verifyUsername(username: string): Promise<status> {
    try {
      const user = await User.findOne({
        where: {
          username,
        }
      });
  
      if (user) {
        return { status: false, message: 'Username already exists' }
      }
      return { status: true, message: 'Valid username' }
    } catch (e) {
      return { status: false, message: 'internal error'}
    }
  }

  public async verifyEmail(email: string): Promise<status> {
    try {
      const user = await User.findOne({
        where: {
          email,
        }
      });

      if(user) {
        return { status: false, message: 'Email already exists' };
      }
      return { status: true, message: 'Valid email' };
    } catch (e) {
      return { status: false, message: 'internal error'}
    }
  }

  public async getAll(): Promise<User[]> {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'verified']
    });
    return users;
  }

  public async getById(id: number): Promise <User | undefined> {
      const user = await User.findOne({
        attributes: ['id', 'username', 'email', 'role', 'verified'],
        where: {
          id,
        }
      });

      if (user) {
        return user;
      }
      return undefined;

  }

  public async getByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await User.findOne({
        where: {
          email,
        }
      });

      if(user) {
        return user;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  }



  public async create(user: userData): Promise<status> {
    const { username, email, password  } = user;
    try {
      const usernameExists = await this.verifyUsername(username);
      const emailExists = await this.verifyEmail(email);

      if(!usernameExists.status) {
        return usernameExists;
      } else if (!emailExists.status) {
        return emailExists;
      } else {
        const hash = HashGenerator.passwordToHash(password); 
        const token = UUIDGenerator.generate();
        await User.create({
          username,
          email,
          password: hash,
          token,
        });
        await EmailSender.send(email, token, 'validateAccount');

        return { status: true, message: 'A verification email will be sent to the email address you registered' }
      }
      
    } catch (e) {
      return { status: false, message: 'internal error'} 
    }
  }

  public async createAdmin(user: userData): Promise<status> {
    const { username, email, password  } = user;
    try {
      const usernameExists = await this.verifyUsername(username);
      const emailExists = await this.verifyEmail(email);
      if(!usernameExists.status) {
        return usernameExists;
      } else if (!emailExists.status) {
        return emailExists;
      } else {
        const hash = HashGenerator.passwordToHash(password); 
        const token = UUIDGenerator.generate();
        await User.create({
          username,
          email,
          password: hash,
          token,
          role: 1,
          verified: 1,
        });

        return { status: true, message: 'success' }
      }

      
    } catch (e) {
      console.log(e);
      return { status: false, message: 'internal error'} 
    }
  }



  public async validateAccount(token: string): Promise<status> {
      const user = await User.findOne({
        where: {
          token,
        }
      });

      if(user) {
        await User.update({ verified: 1 }, {
          where: {
            id: user.id,
          }
        });
        return {status: true, message: 'your account has been verified'}
      }
      return {status: false, message: 'user not found'};
    
  }

  public async updateUsername(email: string, newUsername: string): Promise<status> {
    try {
      const usernameExists = await this.verifyUsername(newUsername);
      if (!usernameExists.status) {
        return usernameExists;
      }

        await User.update({
          username: newUsername,
        }, {
          where: {
            email,
          }
        });
        return {status: true, message: 'username updated successfully'}
  
     
    } catch (e) {
      return {status: false, message: 'internal error'}
    }
  } 

  public async updatePassword(email: string, newPassword: string) {
    try {
        const hash = HashGenerator.passwordToHash(newPassword);
        User.update({
          password: hash,
        }, {
          where: {
            email,
          }
        });
        return {status: true, message: 'password updated successfully'}
    } catch (e) {
      return {status: false, message: 'internal error'}
    }
  }

  public async delete(email: string): Promise<status> {
    try {
        await User.destroy({
          where: {
            email,
          }
        });
      return { status: true, message: 'resource deleted successfully'}
    } catch (e) {
      console.log(e)
      return { status: false, message: 'internal error'};
    }
  }
}

export default new UsersService;