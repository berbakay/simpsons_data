const { manipulateCharacters, removeCharacterKey, createCharEpJuncTab, replaceTitleWithID } = require('../utils/data_manipulation');

const { episodeData, characterData } = require('../data/index.js');

exports.seed = function (knex) {
    return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
        const updatedCharacters = manipulateCharacters(characterData);
        return knex('characters')
        .insert(updatedCharacters)
        .returning('*')
    })
    .then((characters) => {
        const updatedEpisodes = removeCharacterKey(episodeData);
        const episodes = knex('episodes')
        .insert(updatedEpisodes)
        .returning('*')
        return Promise.all([characters, episodes]);
    })
    .then(([characters, episodes]) => {
        const refArray = createCharEpJuncTab(characters, episodeData);
        const finalRefArray = replaceTitleWithID(refArray, episodes);
        return knex('characterepisode')
        .insert(finalRefArray)
        .returning('*')
    })
};