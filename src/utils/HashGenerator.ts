import bcrypt from 'bcryptjs'

class HashGenerator {
  public  passwordToHash(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }
}

export default new HashGenerator;