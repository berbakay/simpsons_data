const { getCharacters, getCharactersByID } = require('../controllers/characters.controllers');
const { handle405 } = require('../error');
const characterRouter = require('express').Router();

characterRouter.route('/').get(getCharacters).all(handle405);
characterRouter.route('/:character_id').get(getCharactersByID).all(handle405);

module.exports = characterRouter;