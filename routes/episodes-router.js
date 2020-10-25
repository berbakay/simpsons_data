const episodesRouter = require('express').Router();
const { getEpisodes, getEpisodeByID } = require('../controllers/episodes.controller');
const { handle405 } = require('../error');

episodesRouter.route('/').get(getEpisodes).all(handle405);
episodesRouter.route('/:episode_id').get(getEpisodeByID).all(handle405);

module.exports = episodesRouter;