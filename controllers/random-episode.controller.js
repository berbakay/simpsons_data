const { fetchRandomEpisode, fetchEpisodeByCharacter } = require('../models/random-episode.model');

exports.getRandomEpisode = (req, res, next) => {
    const { isGood, minSeason, maxSeason, character_id} = req.query;
    if(!character_id) {
    fetchRandomEpisode(isGood, minSeason, maxSeason)
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
    } else {
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
}