const randomEpisodeRouter = require('express').Router();
const { getRandomEpisode } = require('../controllers/random-episode.controller');
const { handle405 } = require('../error');

randomEpisodeRouter.route('/').get(getRandomEpisode).all(handle405);

module.exports = randomEpisodeRouter;