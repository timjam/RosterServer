import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Auth = {
  hashPassword: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
  comparePassword: (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword),
  generateToken: (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
  },
};

export default Auth;
