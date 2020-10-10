const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const { handle500 } = require('./error');

app.use('/api', apiRouter);
app.use(handle500);

module.exports = app;