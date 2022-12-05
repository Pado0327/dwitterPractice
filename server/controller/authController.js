import usersRepository from '../data/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = '3T#hM8#n^#Qn7aQyaZuIK7VdpRPr#*P7';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function handleSignUp(req, res, next) {
  //1 check id and if it eixts in database
  // if not, then cretae a user and save it to the database
  // 3. send token and username
  const { username, password, name, email, url } = req.body;
  const user = await usersRepository.findByUserName(username);
  if (user) {
    return res.status(409).json({ message: `User already exsits` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await usersRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);

  res.status(201).json({ username, token });
}

export async function handleLogin(req, res, next) {
  const { username, password } = req.body;
  const user = await usersRepository.findByUserName(username);

  if (!user) {
    return res.status(401).json({ message: `Invalid username or password` });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: `{Invalid username or password}` });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ username, token });
}

function createJwtToken(userId) {
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: jwtExpiresInDays,
  });

  return token;
}

export async function handleGetMe(req, res, next) {
  console.log(req.userId);
  const user = await usersRepository.findByUserId(req.userId);

  res.status(200).json({ token: req.token, username: user.username });
}
