import validator from 'validator';

// POST /qna
export function createQuestion(req, res, next) {
  const body = req.body;

  if (!isValidQuestion(body)) {
    res.status(400).send('question payload validation 실패');
    return;
  }

  next();
}

// GET /qna
export function getQuestionList(req, res, next) {
  const offset = req.query.offset;
  const limit = req.query.limit;

  if (typeof offset === 'undefined' ||
    typeof limit === 'undefined' ||
    !validator.isNumeric(offset) ||
    !validator.isNumeric(limit) ||
    parseInt(offset, 10) < 0 ||
    parseInt(limit, 10) < 1) {
    res.status(400).send('잘못된 query parameter');
    return;
  }
  next();
}

// GET /qna/:id
export function getQuestion(req, res, next) {
  const id = req.params.id;

  if (!validator.isNumeric(id)) {
    res.status(400).send('path parameter validation 실패');
    return;
  }

  next();
}

// PUT /qna/:id
export function updateQuestion(req, res, next) {
  const body = req.body;
  
  if (!isValidQuestion(body)) {
    res.status(400).send('question payload validation 실패');
    return;
  }

  next();
}

// DELETE /qna/:id
export function deleteQuestion(req, res, next) {
  const id = req.params.id;

  if (!validator.isNumeric(id)) {
    res.status(400).send('path parameter validation 실패');
    return;
  }

  next();
}

function isValidQuestion(question) {
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

  if (!validator.isLength(question.title, titleLength) ||
    !validator.isLength(question.body, bodyLength)) {
    return false;
  }

  const answers = question.answers;

  for (const answer of answers) {
    if (validator.isEmpty(answer.lawyer) ||
      !validator.isLength(answer.body, answerBodyLength)) {
      return false;
    }
  }

  return true;
}