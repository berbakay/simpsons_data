const episodeRouter = require('express').Router();
const { getEpisode } = require('../controllers/episode.controller');
const { handle405 } = require('../error');

episodeRouter.route('/').get(getEpisode).all(handle405);

module.exports = episodeRouter;