const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const { handle500, handle404, handle400 } = require('./error');

app.use(cors())
app.use('/api', apiRouter);
app.all('/*', handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;