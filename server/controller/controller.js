import Tweets from '../data/data.js';

const tweetsRepository = new Tweets();

export async function handleGet(req, res, next) {
  const username = req.query.username;
  const tweets = await (username
    ? tweetsRepository.getAllTweetsByUserName(username)
    : tweetsRepository.getAllTweets());
  res.status(200).json(tweets);
}

export async function handleGetWithId(req, res, next) {
  const id = req.params.id;
  console.log(id);
  const tweet = await tweetsRepository.getTweetsById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id} not found` });
  }
}

export async function handlePost(req, res, next) {
  const { text } = req.body;
  const tweet = await tweetsRepository.createTweets(text, req.userId);
  res.status(201).json(tweet);
}

// do I need to do it more here?
export async function handlePut(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetsRepository.getTweetsById(id);

  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id} not found` });
  }

  if (tweet.userId != req.userId) {
    return res
      .status(403)
      .json({ message: 'Sorry, you are not allowed to do it' });
  }

  const updated = await tweetsRepository.updateTweets(id, text);

  res.status(200).json(updated);
}

export async function handleDelete(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetsRepository.getTweetsById(id);

  if (!tweet) {
    return res.status(404).json({ message: `Tweet id(${id} not found` });
  }

  if (tweet.userId != req.userId) {
    return res
      .status(403)
      .json({ message: 'Sorry, you are not allowed to do it' });
  }
  await tweetsRepository.deleteTweet(id);
  res.sendStatus(204);
}
