const { fetchCharcters } = require("../models/characters.model")

exports.getCharacters = (req, res, next) => {
    const { nameContains } = req.query;
    fetchCharcters(nameContains)
    .then(characters => {
        res.status(200).send({ characters });
    })
}

exports.getCharactersByID = (req, res, next) => {
    
}