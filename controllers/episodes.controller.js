const { fetchEpisodes, fetchEpisodeByID } = require('../models/episodes.model')

exports.getEpisodes = (req, res, next) => {
    const { isGood, minSeason, maxSeason, character } = req.query;
    fetchEpisodes(isGood, minSeason, maxSeason, character)
    .then(episodes => {
        if(!episodes.length) return Promise.reject(400);
        return res.status(200).send({ episodes })
    })
    .catch(err => next(err));
}

exports.getEpisodeByID = (req, res, next) => {
     const { episode_id } = req.params;
     fetchEpisodeByID(episode_id)
     .then(episodeCharacterData => {
        const episodeData = episodeCharacterData[0];
        episodeData.characters = [];
        episodeCharacterData.shift();
        episodeCharacterData[0].forEach(characterData => {
            episodeData.characters.push(characterData.character_full_name);        
        })
        return res.status(200).send({ episodeData })
     })
     .catch(err => next(err))
}