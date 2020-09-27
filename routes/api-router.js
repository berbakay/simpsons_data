const apiRouter = require('express').Router();
const { getAPIs } = require('../controllers/api.controllers');

apiRouter.route('/').get(getAPIs);

module.exports = apiRouter;