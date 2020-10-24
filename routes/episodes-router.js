const episodesRouter = require('express').Router();
const { getEpisodes } = require('../controllers/episodes.controller');

episodesRouter.route('/').get(getEpisodes)

module.exports = episodesRouter;