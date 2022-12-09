import jwt from 'jsonwebtoken';
import usersRepository from '../data/user.js';

const secretKey = '3T#hM8#n^#Qn7aQyaZuIK7VdpRPr#*P7';

export const isAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'No credentials sent!' });
  }

  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  jwt.verify(token, secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Wrong credential' });
    }

    const user = await usersRepository.findByUserId(decoded.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'No Such a user' });
    }
    req.userId = user.id;
    next();
  });
};
