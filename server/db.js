import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 임시 구현
export function insertQuestion(question) {
  let copy = Object.assign({}, question);
  copy.id = ~~(Math.random() * 100);
  copy.createdAt = moment().format(DATE_FORMAT);
  copy.updatedAt = copy.createdAt;
  return new Promise((resolve, reject) => {
    resolve(copy);
  });
}

export function getQuestionList(offset, limit) {
  return new Promise((resolve, reject) => {
    const questionList = [{
      "id": 1,
      "title": "Lorem ipsum",
      "createdAt": "2017-02-09T20:47:46.677Z",
      "updatedAt": "2017-02-09T20:47:46.677Z",
      "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog",
      "answers": [{
        "lawyer": "홍길동",
        "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog"
      }]
    }, {
      "id": 2,
      "title": "Lorem ipsum",
      "createdAt": "2017-02-09T20:47:46.677Z",
      "updatedAt": "2017-02-09T20:47:46.677Z",
      "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog",
      "answers": [{
        "lawyer": "홍길동",
        "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog"
      }]
    }];

    resolve(questionList);
  });
}

export function getQuestion(id) {
  return new Promise((resolve, reject) => {
    resolve([{
      "id": 2,
      "title": "Lorem ipsum",
      "createdAt": "2017-02-09T20:47:46.677Z",
      "updatedAt": "2017-02-09T20:47:46.677Z",
      "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog",
      "answers": [{
        "lawyer": "홍길동",
        "body": "The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog, The quick brown fox jumps over lazy dog"
      }]
    }]);
  });
}