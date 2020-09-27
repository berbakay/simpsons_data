function manipulateCharacters(characters) {
    return characters.map(character => {
        const newCharacter = {...character}
        newCharacter.character_full_name = newCharacter.name;
        newCharacter.character_short_name = newCharacter.short_name;
        delete newCharacter.name;
        delete newCharacter.short_name;
        return newCharacter;
    });
}

function removeCharacterKey (episodes) {
    return episodes.map(episode => {
        const newEpisode = {...episode};
        delete newEpisode.characters;
        return newEpisode;
    })
}

function createCharEpJuncTab (characters, episodes) {
    const matchArray = []

    episodes.forEach(episode => {
        characters.forEach(character => {
            if(episode.characters.includes(character.character_short_name)) {
                matchArray.push({character_id: character.character_id, title : episode.title});
            }
        })
    });
    return matchArray;
}

function replaceTitleWithID(refObj, newEpData) {
    const newRefObj = [];
    refObj.forEach(reference => {
        newEpData.forEach(episode => {
            if(reference.title === episode.title) {
                const newReference = {...reference};
                newReference.episode_id = episode.episode_id;
                delete newReference.title;
                newRefObj.push(newReference);
            }
        })
    })
    return newRefObj;
}

module.exports = { manipulateCharacters, removeCharacterKey, createCharEpJuncTab, replaceTitleWithID};