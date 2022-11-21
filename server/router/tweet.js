import express from 'express';
import * as TweetsController from '../controller/controller.js';
import { query, body } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Text should be at least 3 characters '),
  body('name').trim().escape().notEmpty().withMessage('이름을 입력해 주세요'),
  body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('유저 네임을 입력해주세요'),
  validate,
];

//Get /tweets
//Get /tweets?username=:username
router.get(
  '/',
  [query('username').notEmpty(), validate],
  TweetsController.handleGet
);

//GET /tweets/:id
router.get('/:id', TweetsController.handleGetWithId);

//POST /tweets
router.post('/', validateTweet, TweetsController.handlePost);

//TODO: 더 해야하나?? 리팩토링을?0-
// PUT /tweets/:id
router.put('/:id', validateTweet, TweetsController.handlePut);
// DELETE /tweets/:id
router.delete('/:id', TweetsController.handleDelete);
export default router;
