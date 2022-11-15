import express from 'express';
import * as TweetsController from '../controller/controller.js';

const router = express.Router();
// 유저네임이나 이런걸 보내는 것보다 req로 보내야하나?
//Get /tweets
//Get /tweets?username=:username
router.get('/', TweetsController.handleGet);

//GET /tweets/:id
router.get('/:id', TweetsController.handleGetWithId);

//POST /tweets
router.post('/', TweetsController.handlePost);

//TODO: 더 해야하나?? 리팩토링을?0-
// PUT /tweets/:id
router.put('/:id', TweetsController.handlePut);
// DELETE /tweets/:id
router.delete('/:id', TweetsController.handleDelete);
export default router;
