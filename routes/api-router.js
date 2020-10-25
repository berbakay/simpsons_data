const apiRouter = require('express').Router();
const { getAPIs } = require('../controllers/api.controllers');
const episodeRouter = require('./episode-router');
const episodesRouter = require('./episodes-router');
const characterRouter = require('./characters-router');

apiRouter.route('/').get(getAPIs);
apiRouter.use('/episode', episodeRouter);
apiRouter.use('/episodes', episodesRouter);
apiRouter.use('/characters', characterRouter);

module.exports = apiRouter;