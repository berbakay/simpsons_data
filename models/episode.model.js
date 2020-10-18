const { type } = require('os');
const connection = require('../db/connection');

function fetchEpisode(isGood, minSeason, maxSeason) {
    if(!minSeason || isNaN(Number(minSeason))) minSeason = 1;
    if(isNaN(Number(maxSeason))) maxSeason = 30
    if(isGood !== "true" || isGood !== "false") isGood = undefined 
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
    .returning('*')
    .then(episodes => {
        const RandomEpisode = Math.floor(Math.random() * (episodes.length - 1));
        return episodes[RandomEpisode];
    })
    .then(randomEpisode => {
        if(!randomEpisode) return Promise.reject(400)
        const CharacterData = connection
        .select('*')
        .from('characterepisode')
        .join('characters', 'characterepisode.character_id', 'characters.character_id')
        .where('episode_id', randomEpisode.episode_id);
        return Promise.all([randomEpisode, CharacterData])
    })
}

module.exports = { fetchEpisode };