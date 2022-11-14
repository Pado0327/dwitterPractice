import express from 'express';
import {
  handleGet,
  handleGetWithId,
  handlePost,
  handlePut,
  handleDelete,
} from '../controller/controller.js';

const router = express.Router();
// 유저네임이나 이런걸 보내는 것보다 req로 보내야하나?
//Get /tweets
//Get /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = handleGet(username);
  res.status(200).json(data);
});

//GET /tweets/:id
router.get('/', (req, res, next) => {
  const id = req.params.id;
  const tweet = handleGetWithId(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id} not found` });
  }
});

//POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = handlePost(text, name, username);
  res.status(201).json(tweet);
});

//TODO: 더 해야하나?? 리팩토링을?
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = handlePut(id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id} not found` });
  }
});
// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  handleDelete(id);
  res.sendStatus(204);
});
export default router;
