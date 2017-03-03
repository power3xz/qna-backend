import express from 'express';

import * as validationMiddleware from './validationMiddleware';
import * as db from './db';
import * as cache from './cache';

const router = express.Router();

// get methods
//   Q&A 게시물 목록 API
router.get('/qna', validationMiddleware.getQuestionList, (req, res) => {
  const offset = req.params.offset;
  const limit = req.params.limit;

  cache.getQuestionListFromCache(offset, limit).then((recordsFromCache) => {
    if (recordsFromCache.length < 1) {
      res.set('X-Cache-Hit', 'false');
      return db.getQuestionList(offset, limit);
    } else {
      res.set('X-Cache-Hit', 'true');
      return recordsFromCache;
    }
  }).then((questionList) => {
    if (res.get('X-Cache-Hit') === 'false') {
      cache.setQuestionListCache(offset, limit, questionList);
    } 
    res.send(questionList);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('서버 에러');
  });
});

//   Q&A 게시물 읽기 (단일 항목) API
router.get('/qna/:id', validationMiddleware.getQuestion, (req, res) => {
  const id = req.params.id;
  cache.getQuestionFromCache(id).then((recordFromCache) => {
    if (recordFromCache.length < 1) {
      res.set('X-Cache-Hit', 'false');
      return db.getQuestion(id);
    } else {
      res.set('X-Cache-Hit', 'true');
      return recordFromCache;
    }
  }).then((question) => {
    if (question.length < 1) {
      res.status(404).send('존재하지 않는 게시물');
      return;
    }

    if (res.get('X-Cache-Hit') === 'false') {
      cache.setQuestionCache(id, question);
    } 
    res.send(question);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('서버 에러');
  });
});

//   Q&A 게시물 CSV 내보내기 API
router.get('/qna.csv', (req, res) => {
  res.send(req.url);
});

// post methods
//   Q&A 게시물 작성 API
router.post('/qna', validationMiddleware.createQuestion, (req, res) => {
  let question = req.body;
  db.insertQuestion(question).then((savedRecord) => {
    res.send(savedRecord);
  }).catch((err) => {
    res.status(500).send('서버 에러');
  })
});

//   Q&A 게시물 내보내기 API (3rd party content provider)
router.post('/qna/:id/export', (req, res) => {
  res.send(req.url);
});

// put methods
//   Q&A 게시물 수정 API
router.put('/qna/:id', validationMiddleware.updateQuestion, (req, res) => {
  const id = req.params.id;
  const question = req.body;
  db.getQuestion(id).then((question) => {
    if (question.length < 1) {
      res.status(404).send('존재하지 않는 게시물');
      return;
    }
    return db.updateQuestion(id, question);
  }).then((updatedQuestion) => {
    res.send(updatedQuestion);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('서버 에러');
  });
});

// delete methods
//   Q&A 게시물 삭제 API
router.delete('/qna/:id', (req, res) => {
  res.send(req.url);
});

export default router;