const { fetchEpisodes, fetchEpisodeByID } = require('../models/episodes.model')

exports.getEpisodes = (req, res, next) => {
    const { isGood, minSeason, maxSeason, limit, p, sort_by, order } = req.query;
    fetchEpisodes(isGood, minSeason, maxSeason, limit, p, sort_by, order)
    .then(episodes => {
        if(!episodes.length) return Promise.reject(400);
        const fetchedEpisodesNoLimit = fetchEpisodes(isGood, minSeason, maxSeason, Infinity, Infinity)
        return Promise.all([episodes, fetchedEpisodesNoLimit])
    })
    .then(([episodes, fetchedEpisodesNoLimit]) => {
        res.status(200).send({ episodes, total_count: fetchedEpisodesNoLimit.length})
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