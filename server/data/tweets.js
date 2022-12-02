let tweets = [
  {
    id: '1',
    text: '테스트 용 입니다',
    createdAt: new Date.toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '테스트 용 입니다2',
    createdAt: new Date.toString(),
    userId: '2',
  },
];

export function getAllTweets() {
  return tweets;
}

export function getAllTweetsByUsername(username) {
  return tweet.filter((t) => t.username === username);
}
