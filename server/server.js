import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './router';

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// not found
app.all('*', (req, res) => {
  res.status(404).send('not found');
})

app.listen(PORT, () => {
  let msg = `Server is listening on port ${PORT}`;
  console.log(msg);
});