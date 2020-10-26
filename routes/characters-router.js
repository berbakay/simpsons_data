const { getCharacters } = require('../controllers/characters.controllers');
const { handle405 } = require('../error');
const characterRouter = require('express').Router();

characterRouter.route('/').get(getCharacters).all(handle405);
characterRouter.route('/:character_id').get()

module.exports = characterRouter;