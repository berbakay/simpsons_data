const connection = require('../db/connection');

function fetchEpisodes (isGood, minSeason, maxSeason, limit, p, sort_by, order) {
    if(!minSeason || isNaN(Number(minSeason))) minSeason = 1;
    let coercedLimit = Number(limit);
    let coercedP = Number(p);
    if(isNaN(coercedLimit) || coercedLimit < 0) coercedLimit = 10;
    if(isNaN(Number(maxSeason))) maxSeason = 30
    if(isGood !== "true" && isGood !== "false") isGood = undefined 
    if(isNaN(coercedP)) coercedP = 1;
    const offset = coercedLimit * (coercedP-1);
    if(!sort_by) sort_by = 'episode_id'
    if(order !== 'desc' && order !== 'asc') order = 'desc';
    return connection
    .select('*')
    .from('episodes')
    .modify((request) => {
        if(isGood !== undefined) {
            request.where('good', isGood);
        }
    })
    .andWhere('season', '>=', minSeason)
    .modify((request) => {
        if(maxSeason) {
            request.andWhere('season', '<=', maxSeason);
        }
    })
    .orderBy(sort_by, order)
    .limit(coercedLimit)
    .offset(offset);
}

function fetchEpisodeByID (episode_id) {
    return connection
    .select('*')
    .from('episodes')
    .where('episode_id', episode_id)
    .returning('*')
    .then(episode => {
        if(!episode.length) return Promise.reject(400)
        const CharacterData = connection
        .select('*')
        .from('characterepisode')
        .join('characters', 'characterepisode.character_id', 'characters.character_id')
        .where('episode_id', episode[0].episode_id);
        return Promise.all([episode[0], CharacterData])
    })
}   

module.exports = { fetchEpisodes, fetchEpisodeByID};