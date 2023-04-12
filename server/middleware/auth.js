import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as usersRepository from '../data/user.js';

export const isAuth = async (req, res, next) => {
  let token;

  //check the header first;
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  //if no token in the header, check the cookie
  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return res.status(401).json({ message: 'No credentials sent!' });
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Wrong credential' });
    }

    const user = await usersRepository.findByUserId(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'No Such a user' });
    }
    req.token = token;
    req.userId = user.id;
    next();
  });
};
