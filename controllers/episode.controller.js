const { fetchEpisode } = require('../models/episode.model');

exports.getEpisode = (req, res, next) => {
    const { isGood, minSeason, maxSeason } = req.query;
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