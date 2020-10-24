const episodeRouter = require('express').Router();
const { getEpisode, getEpisodeByCharacter } = require('../controllers/episode.controller');
const { handle405 } = require('../error');

episodeRouter.route('/').get(getEpisode).all(handle405);
episodeRouter.route('/:character_id').get(getEpisodeByCharacter).all(handle405);

module.exports = episodeRouter;