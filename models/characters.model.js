const connection = require('../db/connection');

function fetchCharcters (nameContains) {
    return connection
    .select('*')
    .from('characters')
    .modify((request) => {
        if(nameContains) {
            request
            .where('character_full_name', 'like', `%${nameContains}%`)
        }
    })
    
}

function fetchCharctersbyID (character_id) {
    return connection
    .select('*')
    .from('characters')
    .where('character_id', character_id)
    .then(character => {
        if(!character.length) return Promise.reject(400)
        const episodeData = connection
        .select('*')
        .from('characterepisode')
        .join('episodes', 'characterepisode.episode_id', 'episodes.episode_id')
        .where('character_id', character[0].character_id);
        return Promise.all([character[0], episodeData])
    })
}

module.exports = { fetchCharcters, fetchCharctersbyID }