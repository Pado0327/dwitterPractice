import express from 'express';
import * as TweetsController from '../controller/controller.js';
import { query, body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage('Text should be at least 3 characters '),
  validate,
];

//Get /tweets
//Get /tweets?username=:username
router.get('/', TweetsController.handleGet);

//GET /tweets/:id
router.get('/:id', isAuth, TweetsController.handleGetWithId);

//POST /tweets
router.post('/', isAuth, validateTweet, TweetsController.handlePost);

//TODO: 더 해야하나?? 리팩토링을?0-
// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, TweetsController.handlePut);
// DELETE /tweets/:id
router.delete('/:id', isAuth, TweetsController.handleDelete);
export default router;
