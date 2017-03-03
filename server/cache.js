// 임시 구현

let cachedQuestionList = [];

export function getQuestionListFromCache(offset, limit) {
  return new Promise((resolve, reject) => {
    resolve(cachedQuestionList);
  });
}

export function setQuestionListCache(offset, limit, questionList) {
  cachedQuestionList = questionList;
}