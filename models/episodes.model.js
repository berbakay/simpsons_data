const connection = require('../db/connection');

function fetchEpisodes (isGood, minSeason, maxSeason) {
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
    });
}

module.exports = { fetchEpisodes };