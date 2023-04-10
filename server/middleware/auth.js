import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as usersRepository from '../data/user.js';

export const isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'No credentials sent!' });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Wrong credential' });
    }

    const user = await usersRepository.findByUserId(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'No Such a user' });
    }

    req.userId = user.id;
    next();
  });
};
