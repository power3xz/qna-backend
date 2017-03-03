// 임시 구현

let cachedQuestionList = [];
let cachedQuetion = [];

export function getQuestionListFromCache(offset, limit) {
  return new Promise((resolve, reject) => {
    resolve(cachedQuestionList);
  });
}

export function setQuestionListCache(offset, limit, questionList) {
  cachedQuestionList = questionList;
}

export function getQuestionFromCache(id) {
  return new Promise((resolve, reject) => {
    resolve(cachedQuetion);
  });
}

export function setQuestionCache(id, question) {
  cachedQuetion = question;
}