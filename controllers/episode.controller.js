const { fetchEpisode, fetchEpisodeByCharacter } = require('../models/episode.model');

exports.getEpisode = (req, res, next) => {
    const { isGood, minSeason, maxSeason} = req.query;
    fetchEpisode(isGood, minSeason, maxSeason)
    .then(EpisodeCharacterData => {
        const episodeData = EpisodeCharacterData[0];
        episodeData.characters = [];
        EpisodeCharacterData.shift();
        EpisodeCharacterData[0].forEach(characterData => {
            episodeData.characters.push(characterData.character_full_name);        
        })
        return res.status(200).send({ episodeData })
    })
    .catch(err => next(err))
}

exports.getEpisodeByCharacter = (req, res, next) => {
    const { isGood, minSeason, maxSeason } = req.query;
    const { character_id } = req.params;
    fetchEpisodeByCharacter(isGood, minSeason, maxSeason, character_id)
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