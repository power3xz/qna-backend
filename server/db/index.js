import moment from 'moment';
import * as lokidb from './lokidb';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 임시 구현
export function insertQuestion1(question) {
  let copy = Object.assign({}, question);
  copy.id = ~~(Math.random() * 100);
  copy.createdAt = moment().format(DATE_FORMAT);
  copy.updatedAt = copy.createdAt;
  return new Promise((resolve, reject) => {
    resolve(copy);
  });
}

export function insertQuestion(question) {
  let copy = Object.assign({}, question);
  let inserted = lokidb.questions.insert(copy);
  inserted.id = inserted.$loki;
  inserted.createdAt = moment(inserted.meta.created).format(DATE_FORMAT);
  inserted.updatedAt = inserted.createdAt;
  delete inserted.meta;

  return new Promise((resolve, reject) => {
    resolve(inserted);
  });
}

export function getQuestionList1(offset, limit) {
  return new Promise((resolve, reject) => {
    resolve(questionList);
  });
}

export function getQuestionList(offset, limit) {
  let results = lokidb.questions.chain().offset(offset).limit(limit).data();
  results.map((item) => {
    return item;
  });
  return new Promise((resolve, reject) => {
    resolve(results);
  });
}

export function getQuestion(id) {
  let result =  lokidb.questions.find({id: parseInt(id, 10)});
  return new Promise((resolve, reject) => {
    resolve(result);
  });
}

export function updateQuestion(id, question) {
  let result = lokidb.questions.findOne({id: parseInt(id, 10)});
  result.updatedAt = moment().format(DATE_FORMAT);
  result.title = question.title;
  result.body = question.body;
  result.answers = question.answers;

  return new Promise((resolve, reject) => {
    resolve(result);
  });
}

export function deleteQuestion(id) {
  lokidb.questions.findAndRemove({id: parseInt(id, 10)});
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}