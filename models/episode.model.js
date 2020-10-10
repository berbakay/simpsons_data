const connection = require('../db/connection');

function fetchEpisode() {
    return connection
    .select('*')
    .from('episodes')
    .returning('*')
    .then(episodes => {
        const RandomEpisode = Math.floor(Math.random() * (episodes.length - 1));
        return episodes[RandomEpisode];
    })
    .then(randomEpisode => {
        const CharacterData = connection
        .select('*')
        .from('characterepisode')
        .join('characters', 'characterepisode.character_id', 'characters.character_id')
        .where('episode_id', randomEpisode.episode_id);
        return Promise.all([randomEpisode, CharacterData])
    })
}

module.exports = { fetchEpisode };