const { fetchCharcters, fetchCharctersbyID } = require("../models/characters.model")

exports.getCharacters = (req, res, next) => {
    const { nameContains } = req.query;
    fetchCharcters(nameContains)
    .then(characters => {
        res.status(200).send({ characters });
    })
}

exports.getCharactersByID = (req, res, next) => {
    const { character_id } = req.params;
    fetchCharctersbyID(character_id)
    .then(episodeCharacterData => {
        const characterData = episodeCharacterData[0];
        characterData.episodes = [];
        episodeCharacterData.shift();
        console.log(episodeCharacterData);
        episodeCharacterData[0].forEach(episodeData => {
            characterData.episodes.push({title : episodeData.title, episode_id: episodeData.episode_id});        
        })
        res.status(200).send({ character: characterData });
    })
    .catch(err => next(err));
}