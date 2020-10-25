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

module.exports = { fetchCharcters }