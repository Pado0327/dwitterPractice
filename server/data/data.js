export default class Data {
  constructor() {
    this.tweet = [
      {
        id: '1',
        text: '테스트 용 입니다',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://as1.ftcdn.net/v2/jpg/05/16/82/44/1000_F_516824436_Ect7KAWSGlCbTbstkwzyH9ssjDqyRGCD.jpg',
      },
      {
        id: '2',
        text: '테스트 용 입니다2',
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'ellie',
        url: 'https://as1.ftcdn.net/v2/jpg/05/16/82/44/1000_F_516824436_Ect7KAWSGlCbTbstkwzyH9ssjDqyRGCD.jpg',
      },
    ];
  }

  updateTweet = (tweet) => {
    this.tweet = [tweet, ...this.tweet];
  };

  deleteTweet = (id) => {
    this.tweet = this.tweet.filter((t) => t.id !== id);
    console.log(this.tweet);
  };
}
