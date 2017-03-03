import express from 'express';

const router = express.Router();

// get methods
//   Q&A 게시물 목록 API
router.get('/qna', (req, res) => {
  res.send(req.url);
});
//   Q&A 게시물 읽기 (단일 항목) API
router.get('/qna/:id', (req, res) => {
  res.send(req.url);
});
//   Q&A 게시물 CSV 내보내기 API
router.get('/qna.csv', (req, res) => {
  res.send(req.url);
});

// post methods
//   Q&A 게시물 작성 API
router.post('/qna', (req, res) => {
  res.send(req.url);
});
//   Q&A 게시물 내보내기 API (3rd party content provider)
router.post('/qna/:id/export', (req, res) => {
  res.send(req.url);
});

// put methods
//   Q&A 게시물 수정 API
router.put('/qna/:id', (req, res) => {
  res.send(req.url);
});

// delete methods
//   Q&A 게시물 삭제 API
router.delete('/qna/:id', (req, res) => {
  res.send(req.url);
});

export default router;