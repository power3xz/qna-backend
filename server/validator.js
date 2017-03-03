import validator from 'validator';

// POST /qna
export function createQuestion(req, res, next) {
  const body = req.body;
  const titleLength = {
    min: 10,
    max: 50
  };

  const bodyLength = {
    min: 20,
    max: 400
  };

  const answerBodyLength = {
    min: 20,
    max: 2000
  };


  if (!validator.isLength(body.title, titleLength) ||
    !validator.isLength(body.body, bodyLength)) {
    res.status(400).send('question payload validation 실패');
    return;
  }

  const answers = body.answers;

  for (const answer of answers) {
    if (validator.isEmpty(answer.lawyer) ||
      !validator.isLength(answer.body, answerBodyLength)) {
      res.status(400).send('question payload validation 실패');
      return;
    }
  }

  next();
}