import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Crypto = {
  hashPassword: (password: string): string => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
  comparePassword: (password: string, hashedPassword: string): boolean => {
    const same = bcrypt.compareSync(password, hashedPassword);
    return same;
  },
  generateToken: (id: string): string => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    return token;
  },
};

export default Crypto;
