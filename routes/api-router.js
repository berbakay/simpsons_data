const apiRouter = require('express').Router();
const { getAPIs } = require('../controllers/api.controllers');
const randomEpisodeRouter = require('./random-episode-router');
const episodesRouter = require('./episodes-router');
const characterRouter = require('./characters-router');
const { handle405 } = require('../error');

apiRouter.route('/').get(getAPIs).all(handle405);
apiRouter.use('/random_episode', randomEpisodeRouter);
apiRouter.use('/episodes', episodesRouter);
apiRouter.use('/characters', characterRouter);

module.exports = apiRouter;