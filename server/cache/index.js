// 임시 구현
import Redis from 'ioredis';

const redis = new Redis();
const expiryPeriod = 5 * 60;

let disable = false;

export function getQuestionListFromCache(offset, limit) {
  const param = {
    offset: offset,
    limit: limit
  };

  return new Promise((resolve, reject) => {
    redis.get(JSON.stringify(param), (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(result));
      }
    });
  });
}

export function setQuestionListCache(offset, limit, questionList) {
  const param = {
    offset: offset,
    limit: limit
  };

  if (!disable) {
    redis.set(JSON.stringify(param), JSON.stringify(questionList), 'EX', expiryPeriod);
  }
}

export function getQuestionFromCache(id) {
  return new Promise((resolve, reject) => {
    redis.get(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(result));
      }
    })
  });
}

export function setQuestionCache(id, question) {
  if (!disable) {
    redis.set(id, JSON.stringify(question), 'EX', expiryPeriod);
  }
}

export function disable() {
 disable = true;
}