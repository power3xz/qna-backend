import express from 'express';

import * as validationMiddleware from './validationMiddleware';
import * as db from './db';
import * as cache from './cache';

const router = express.Router();

// get methods
//   Q&A 게시물 목록 API
router.get('/qna', validationMiddleware.getQuestionList, (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  cache.getQuestionListFromCache(offset, limit).then((recordsFromCache) => {
    if (recordsFromCache === null) {
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
    if (recordFromCache === null) {
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
  db.getQuestionList(0, 100).then((questionList) => {
    let csv = '"질문 ID", "질문 제목", "질문 본문", "게시물 작성일", "게시물 작성일", "답변 변호사"\n';
    csv += questionList.map((question) => {
      let lawyers = question.answers.map((answer) => { return answer.lawyer }).join(', ');
      return `${question.id}, "${question.title}", "${question.body}", "${question.createdAt}", "${question.updatedAt}", "${lawyers}"`;
    }).join('\n');
    
    res.send(csv);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('서버 에러');
  });
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
  db.getQuestion(id).then((questionFromDB) => {
    if (questionFromDB.length < 1) {
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
router.delete('/qna/:id', validationMiddleware.deleteQuestion, (req, res) => {
  const id = req.params.id;
  db.getQuestion(id).then((question) => {
    if (question.length < 1) {
      throw {code: 404};
    }

    return db.deleteQuestion(id);
  }).then((result) => {
    res.status(204).send('성공');
  }).catch((err) => {
    console.log(err);
    if (err.code === 404) {
      res.status(404).send('존재하지 않는 게시물');
    } else {
      res.status(500).send('서버 에러');
    }
  });
});

export default router;