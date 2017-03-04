// 임시 구현

let cachedQuestionList = [];
let cachedQuetion = [];
let disable = false;

export function getQuestionListFromCache(offset, limit) {
  return new Promise((resolve, reject) => {
    resolve(cachedQuestionList);
  });
}

export function setQuestionListCache(offset, limit, questionList) {
  if (!disable) {
    cachedQuestionList = questionList;
  }
}

export function getQuestionFromCache(id) {
  return new Promise((resolve, reject) => {
    resolve(cachedQuetion);
  });
}

export function setQuestionCache(id, question) {
  if (!disable) {
    cachedQuetion = question;
  }
}

export function disable() {
 disable = true;
}