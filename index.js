import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  let msg = `Server is listening on port ${PORT}`;
  console.log(msg);
});