const episodeRouter = require('express').Router();
const { getEpisode } = require('../controllers/episode.controller')

episodeRouter.route('/').get(getEpisode);

module.exports = episodeRouter;