const connection = require('../db/connection');

function fetchEpisodes (isGood, minSeason, maxSeason, character) {
    if(!minSeason || isNaN(Number(minSeason))) minSeason = 1;
    if(isNaN(Number(maxSeason))) maxSeason = 30
    if(isGood !== "true" && isGood !== "false") isGood = undefined 
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