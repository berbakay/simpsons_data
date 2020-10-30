const connection = require('../db/connection');

function fetchCharcters (nameContains, limit, p, sort_by, order) {
    let coercedLimit = Number(limit);
    let coercedP = Number(p);
    if(isNaN(coercedLimit)) coercedLimit = 10;
    if(isNaN(coercedP)) coercedP = 1;
    const offset = coercedLimit * (coercedP-1);
    if(!sort_by) sort_by = 'character_id'
    if(order !== 'desc' && order !== 'asc') order = 'desc';
    return connection
    .select('*')
    .from('characters')
    .modify((request) => {
        if(nameContains) {
            request
            .where('character_full_name', 'like', `%${nameContains}%`)
        }
    })
    .orderBy(sort_by, order)
    .limit(coercedLimit)
    .offset(offset);
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