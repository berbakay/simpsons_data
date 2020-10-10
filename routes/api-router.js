const apiRouter = require('express').Router();
const { getAPIs } = require('../controllers/api.controllers');
const episodeRouter = require('./episode-router');

apiRouter.route('/').get(getAPIs);
apiRouter.use('/episode', episodeRouter);

module.exports = apiRouter;