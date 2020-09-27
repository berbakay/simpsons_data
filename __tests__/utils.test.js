const episodes = require('../db/data/development-data/episodes');
const { manipulateCharacters, removeCharacterKey, createCharEpJuncTab, replaceTitleWithID } = require('../db/utils/data_manipulation');

describe('manipulateCharacters', () => {
    it ('returns an array', () => {
        expect (Array.isArray(manipulateCharacters([{short_name: "one" , name: "number one"}]))).toBe(true);
    })
    it('returns correct keys for single passed character', () => {
        const input = [{short_name: "one" , name: "number one"}];
        const output = manipulateCharacters(input);
        const expected = [{character_short_name: "one" , character_full_name: "number one"}];
        expect(output).toEqual(expected);
    })
    it('returns correct keys for array of characters', () => {
        const input = [{"short_name": "one", "name": "number one"},{ "short_name": "two","name": "number two"},{"short_name": "three","name": "number three"}];
        const output = manipulateCharacters(input);
        const expected = [{character_short_name: "one" , character_full_name: "number one"},{character_short_name: "two" , character_full_name: "number two"}, {character_short_name: "three" , character_full_name: "number three"}]
        expect(output).toEqual(expected);
    })
    it('input is not mutated', () => {
        const input = [{"short_name": "one", "name": "number one"},{ "short_name": "two","name": "number two"},{"short_name": "three","name": "number three"}];
        manipulateCharacters(input);
        expect(input).toEqual([{"short_name": "one", "name": "number one"},{ "short_name": "two","name": "number two"},{"short_name": "three","name": "number three"}]);
    })
    it('returns a new array', () => {
        const input = [{"short_name": "one", "name": "number one"},{ "short_name": "two","name": "number two"},{"short_name": "three","name": "number three"}];
        expect(manipulateCharacters(input)).not.toBe(input);
    })
})

describe('removeCharacterKey', () => {
    it('return an array', () => {
        const input = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]
        expect(Array.isArray(removeCharacterKey(input))).toBe(true);
    })
    it('removes character key for one chracter', () => {
        const input = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]
        const output = removeCharacterKey(input);
        const expected = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
            }]
        expect(output).toEqual(expected);
    })
    it('removes character key for an array of characters', () => {
        const input = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "bart"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]
        const output = removeCharacterKey(input);
        const expected = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
            }]
        expect(output).toEqual(expected);
    })
    it('input is not mutated', () => {
        const input = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "bart"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]
        removeCharacterKey(input);
        expect(input).toEqual([
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "bart"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]);
    })
    it('returns a new array', () => {
        const input = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "homer"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "bart"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "homer"
                ]
            }]
        expect(removeCharacterKey(input)).not.toBe(input);
    })
})

describe('createCharEpJuncTab', () => {
    it('returns an array', () => {
        expect(Array.isArray(createCharEpJuncTab([{character_id: 1, character_short_name: "one" , character_long_name: "number one"}],[
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": ["one"]
            }]
        ))).toBe(true);
    })
    it('returns object with character id and episode name if match', () => {
        const character = [{character_id: 1, character_short_name: "one" , character_long_name: "number one"}]
        const episode = [{
            "title": "Simpsons Roasting on an Open Fire",
            "season": 1,
            "episode": 1,
            "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
            "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
            "simpsonsworld_id": 273376835817,
            "good": false,
            "characters": ["one"]
        }]
        const output = createCharEpJuncTab(character, episode);
        const expected = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"}];
        expect(output).toEqual(expected);
    })
    it('returns correctly for array of episodes and names', () => {
        const characters = [{character_id: 1, character_short_name: "one" , character_full_name: "number one"},{character_id: 2, character_short_name: "two" , character_full_name: "number two"}, {character_id: 3, character_short_name: "three" , character_full_name: "number three"}]
        const episodes = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "one"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "two"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "three", "two"
                ]
            }]
        const output = createCharEpJuncTab(characters, episodes);
        const expected = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"},{character_id: 2, title: "Bart The Genius"}, {character_id: 2, title: "Homer's Odyssey"}, {character_id: 3, title: "Homer's Odyssey"}];
        expect(output).toEqual(expected);
        })
    it('inputs are not mutated', () => {
        const inputCharacters = [{character_id: 1, character_short_name: "one" , character_full_name: "number one"},{character_id: 2, character_short_name: "two" , character_full_name: "number two"}, {character_id: 3, character_short_name: "three" , character_full_name: "number three"}];
        const inputEpisodes = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "one"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "two"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "three", "two"
                ]
            }]
        createCharEpJuncTab(inputCharacters, inputEpisodes);
        expect(inputCharacters).toEqual([{character_id: 1, character_short_name: "one" , character_full_name: "number one"},{character_id: 2, character_short_name: "two" , character_full_name: "number two"}, {character_id: 3, character_short_name: "three" , character_full_name: "number three"}]);
        expect(inputEpisodes).toEqual([
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                "characters": [
                    "one"
                ]
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                "characters": [
                    "two"
                ]
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                "characters": [
                    "three", "two"
                ]
            }])
    })
})

describe('replaceTitleWithID', () => {
    it('returns an array', () => {
        const refObj = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"},{character_id: 2, title: "Bart The Genius"}, {character_id: 2, title: "Homer's Odyssey"}, {character_id: 3, title: "Homer's Odyssey"}];
        const newEpDat = [{
            "title": "Simpsons Roasting on an Open Fire",
            "season": 1,
            "episode": 1,
            "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
            "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
            "simpsonsworld_id": 273376835817,
            "good": false,
            "episode_id": 1
        }]
        expect(Array.isArray(replaceTitleWithID(refObj, newEpDat))).toBe(true);
    })
    it('replaces title key with episode_id for one episode array', () => {
        const refObj = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"}];
        const newEpDat = [{
            "title": "Simpsons Roasting on an Open Fire",
            "season": 1,
            "episode": 1,
            "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
            "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
            "simpsonsworld_id": 273376835817,
            "good": false,
            "episode_id": 1
        }]
        const output = replaceTitleWithID(refObj, newEpDat);
        const expected = [{character_id: 1, episode_id: 1}]
        expect(output).toEqual(expected);
    })
    it('replaces title with correct episode_id for multi episode array', () => {
        const refObj = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"},{character_id: 2, title: "Bart The Genius"}, {character_id: 2, title: "Homer's Odyssey"}, {character_id: 3, title: "Homer's Odyssey"}]
        const newEpData = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                episode_id: 1
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                episode_id: 2
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                episode_id: 3
        }];
        const output = replaceTitleWithID(refObj, newEpData);
        const expected = [{character_id: 1, episode_id: 1},{character_id: 2, episode_id: 2}, {character_id: 2, episode_id: 3}, {character_id: 3, episode_id: 3}]
        expect(output).toEqual(expected);
    })
    it('inputs are not mutated', () => {
        const refObj = [{character_id: 1, title: "Simpsons Roasting on an Open Fire"},{character_id: 2, title: "Bart The Genius"}, {character_id: 2, title: "Homer's Odyssey"}, {character_id: 3, title: "Homer's Odyssey"}]
        const newEpData = [
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                episode_id: 1
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                episode_id: 2
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                episode_id: 3
        }];
        replaceTitleWithID(refObj, newEpData);
        expect(refObj).toEqual([{character_id: 1, title: "Simpsons Roasting on an Open Fire"},{character_id: 2, title: "Bart The Genius"}, {character_id: 2, title: "Homer's Odyssey"}, {character_id: 3, title: "Homer's Odyssey"}]);
        expect(newEpData).toEqual([
            {
                "title": "Simpsons Roasting on an Open Fire",
                "season": 1,
                "episode": 1,
                "description": "Homer decides to gamble on a \"hunch\" at the dog track when his annual Christmas bonus is canceled.",
                "disneyplus_id": "79529cd0-f1cf-4eec-8b1d-ea1e1b76043b",
                "simpsonsworld_id": 273376835817,
                "good": false,
                episode_id: 1
            },
            {
                "title": "Bart The Genius",
                "season": 1,
                "episode": 2,
                "description": "Bart is believed to be a genius after he switches I.Q. tests with brainy Martin Prince.",
                "disneyplus_id": "250ca502-751e-4b37-a465-f8b518d76ced",
                "simpsonsworld_id": 283744835990,
                "good": false,
                episode_id: 2
            },
            {
                "title": "Homer's Odyssey",
                "season": 1,
                "episode": 3,
                "description": "Fired from his job at the Nuclear Power Plant, Homer decides to embark on a campaign to make all of Springfield safer.",
                "disneyplus_id": "0e8e7f27-0ab2-495f-8254-d99d3c53ce4f",
                "simpsonsworld_id": 273381443699,
                "good": false,
                episode_id: 3
        }])
    })
})