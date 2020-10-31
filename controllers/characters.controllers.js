const { fetchCharcters, fetchCharctersbyID } = require("../models/characters.model");

exports.getCharacters = (req, res, next) => {
    const { nameContains, limit, p, sort_by, order } = req.query;
    fetchCharcters(nameContains, limit, p, sort_by, order)
    .then(characters => {
        if(!characters.length) return Promise.reject(400);
        const fetchCharacterNoLimit = fetchCharcters(nameContains, Infinity, Infinity);
        return Promise.all([characters, fetchCharacterNoLimit])
    })
    .then(([characters, fetchCharacterNoLimit]) => {
        res.status(200).send({ characters, total_count: fetchCharacterNoLimit.length})
    })
    .catch(err => next(err))
}

exports.getCharactersByID = (req, res, next) => {
    const { character_id } = req.params;
    fetchCharctersbyID(character_id)
    .then(episodeCharacterData => {
        const characterData = episodeCharacterData[0];
        characterData.episodes = [];
        episodeCharacterData.shift();
        episodeCharacterData[0].forEach(episodeData => {
            characterData.episodes.push({title : episodeData.title, episode_id: episodeData.episode_id});        
        })
        res.status(200).send({ character: characterData });
    })
    .catch(err => next(err));
}