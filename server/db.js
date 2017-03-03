import moment from 'moment';

const DATE_FORMAT = '';

// 임시 구현
export function insertQuestion(question) {
  let copy = Object.assign({}, question);
  copy.id = ~~(Math.random() * 100);
  copy.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  copy.updatedAt = copy.createdAt;
  return new Promise((resolve, reject) => {
    resolve(copy);
  });
}