const apiRouter = require('express').Router();
const { getAPIs } = require('../controllers/api.controllers');
const episodeRouter = require('./episode-router');
const episodesRouter = require('./episodes-router');

apiRouter.route('/').get(getAPIs);
apiRouter.use('/episode', episodeRouter);
apiRouter.use('/episodes', episodesRouter);

module.exports = apiRouter;