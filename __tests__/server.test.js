const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => {
    return connection.seed.run();
})

afterAll(() => {
    return connection.destroy();
})

describe('app', () => {
    describe('/api', () => {
        describe('Invalid Path', () => {
            it('404: if user inputs an invalid path', () => {
                return request(app).get('/api/nothing').expect(404).then(({ body: { msg } }) => {
                    expect(msg).toBe('Path does not exist');
                })
            })
        })
        describe('GET', () => {
            it('200: returns a JSON object describing available endpoints', () => {
                return request(app).get('/api').expect(200).then(({ body }) => {
                    console.log(body)
                    expect(typeof body).toBe('object');
                })
            })
        })
        describe('/random_episode', () => {
            describe('GET', () => {
                it('200: returns an episode object that returns the correct keys', () => {
                    return request(app).get('/api/random_episode').expect(200).then(({ body : { episodeData } }) => {
                        expect(episodeData).toHaveProperty('title');
                        expect(episodeData).toHaveProperty('season');
                        expect(episodeData).toHaveProperty('episode');
                        expect(episodeData).toHaveProperty('description');
                        expect(episodeData).toHaveProperty('disneyplus_id');
                        expect(episodeData).toHaveProperty('simpsonsworld_id');
                        expect(episodeData).toHaveProperty('episode_id');
                        expect(episodeData).toHaveProperty('good');
                        expect(episodeData).toHaveProperty('characters');
                        expect(Array.isArray(episodeData.characters)).toBe(true);
                    })
                })
                it('200: accepts a isGood query that only returns good or bad episodes', () => {
                    return request(app).get('/api/random_episode?isGood=false').expect(200).then(({ body : { episodeData } }) => {
                        expect(episodeData.good).toBe(false);
                    })
                })
                it('200: accepts a minSeason query that only returns episodes in seasons greater than or equal to that number', () => {
                    return request(app).get('/api/random_episode?minSeason=4').expect(200).then(({ body: { episodeData } }) => {
                        expect(episodeData.season).toBeGreaterThan(3);
                    })
                })
                it('200: accepts a maxSeason query that only returns episodes in seasons less than or equal to that number', () => {
                    return request(app).get('/api/random_episode?maxSeason=1').expect(200).then(({ body: { episodeData } }) => {
                        expect(episodeData.season).toBeLessThan(2);
                    })
                })
                it('200: accepts a character_id query that only returns episodes that contain that character', () => {
                    return request(app).get('/api/random_episode?character_id=1').expect(200).then(({ body : { episodeData } }) => {
                        expect(episodeData.characters).toContain('number one');
                    })
                })
                it('400: if minSeason > number of seasons', () => {
                    return request(app).get('/api/random_episode?minSeason=7').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason < 1', () => {
                    return request(app).get('/api/random_episode?maxSeason=0').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason <  minSeason', () => {
                    return request(app).get('/api/random_episode?minSeason=10&maxSeason=5').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('200: if passed non int for min season', () => {
                    return request(app).get('/api/random_episode?minSeason=cat').expect(200)
                })
                it('200: if passed non int for max season', () => {
                    return request(app).get('/api/random_episode?maxSeason=cat').expect(200)
                })
                it('200: ignores isGood query if passed non bool', () => {
                    return request(app).get('/api/random_episode?isGood=banana').expect(200)
                }) 
            })
            describe('Invalid Method', () => {
                it('405: if passed invalid method', () => {
                    const invalidMethods = ['put', 'delete', 'patch', 'post']
                    const methodPromises = invalidMethods.map(method => {
                        return request(app)[method]("/api/random_episode").expect(405).then(({ body: { msg } }) => {
                            expect(msg).toBe('Invalid Method');
                        })
                    })
                    return Promise.all(methodPromises);
                })
            })
        })
        describe('/episodes', () => {
            describe('GET', () => {
                it('200: returns an array of simpsons episodes', () => {
                    return request(app).get('/api/episodes').expect(200).then(({ body: { episodes } }) => {
                        expect(Array.isArray(episodes)).toBe(true);
                        expect(episodes[0]).toHaveProperty('title');
                        expect(episodes[0]).toHaveProperty('season');
                        expect(episodes[0]).toHaveProperty('episode');
                        expect(episodes[0]).toHaveProperty('description');
                        expect(episodes[0]).toHaveProperty('disneyplus_id');
                        expect(episodes[0]).toHaveProperty('simpsonsworld_id');
                        expect(episodes[0]).toHaveProperty('episode_id');
                        expect(episodes[0]).toHaveProperty('good');
                    })
                })
                it('200: accepts a isGood query that only returns good or bad episodes', () => {
                    return request(app).get('/api/episodes?isGood=false').expect(200).then(({ body : { episodes } }) => {
                        episodes.forEach(episode => {
                            expect(episode.good).toBe(false);
                        })
                    })
                })
                it('200: accepts a minSeason query that only returns episodes in seasons greater than or equal to that number', () => {
                    return request(app).get('/api/episodes?minSeason=4').expect(200).then(({ body: { episodes } }) => {
                        episodes.forEach(episode => {
                            expect(episode.season).toBeGreaterThan(3);
                        })
                    })
                })
                it('200: accepts a maxSeason query that only returns episodes in seasons less than or equal to that number', () => {
                    return request(app).get('/api/episodes?maxSeason=1').expect(200).then(({ body: { episodes } }) => {
                        episodes.forEach(episode => {
                            expect(episode.season).toBeLessThan(2);
                        })
                    })
                })
                it('400: if minSeason > number of seasons', () => {
                    return request(app).get('/api/episodes?minSeason=7').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason < 1', () => {
                    return request(app).get('/api/episodes?maxSeason=0').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason <  minSeason', () => {
                    return request(app).get('/api/episodes?minSeason=10&maxSeason=5').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('200: if passed non int for min season', () => {
                    return request(app).get('/api/episodes?minSeason=cat').expect(200)
                })
                it('200: if passed non int for max season', () => {
                    return request(app).get('/api/episodes?maxSeason=cat').expect(200)
                })
                it('200: ignores isGood query if passed non bool', () => {
                    return request(app).get('/api/episodes?isGood=banana').expect(200)
                })     
                it('200: accepts a limit query (default: 10) wich returns defined number of results', () => {
                    return request(app).get('/api/episodes/?limit=3').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes.length).toBe(3);
                    })
                })
                it('200: accepts a p query which specifiest which paget to start at calculated using limit', () => {
                    return request(app).get('/api/episodes?limit=3&p=2').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes.length).toBe(1);
                    })
                })
                it('200: defaults offset to 0 if passed invalid p type', () => {
                    return request(app).get('/api/episodes/?limit=3&p=cat').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes.length).toBe(3);
                    })
                })
                it('200: has a total_count property displaying total count of articles before limit', () => {
                    return request(app).get('/api/episodes?limit=3').expect(200).then(({ body }) => {
                        expect(body).toHaveProperty('total_count');
                        expect(body.total_count).toBe(4);
                    })
                })
                it('200: default sorts to episode_id (default order desc)', () => {
                    return request(app).get('/api/episodes/').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes[0].episode_id).toBe(4);
                    })
                })
                it('200: sorts the articles by any valid column (default order desc)', () => {
                    return request(app).get('/api/episodes/?sort_by=title').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes[0].title).toBe('Episode 4');
                    })
                })
                it('200: orders article by asc or desc from order query', () => {
                    return request(app).get('/api/episodes/?order=asc').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes[0].episode_id).toBe(1);
                    })
                })
                it('400: when passed a column that does not exist in sort_by query', () => {
                    return request(app).get('/api/episodes?sort_by=doots').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    })
                })
                it('200: order query defaults to desc if query is not asc or desc', () => {
                    return request(app).get('/api/episodes?order=doots').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes[0].title).toBe('Episode 4');
                    })
                })
                it('200: defaults to 10 if passed invalid limit type', () => {
                    return request(app).get('/api/episodes?limit=banana').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes.length).toBe(4);
                    })
                })
                it('200: defaults to 10 if passed limit < 0', () => {
                    return request(app).get('/api/episodes?limit=-1').expect(200).then(({ body: { episodes } }) => {
                        expect(episodes.length).toBe(4);
                    })
                })
            })
            describe('Invalid Method', () => {
                it('405: if passed invalid method', () => {
                    const invalidMethods = ['put', 'delete', 'patch', 'post']
                    const methodPromises = invalidMethods.map(method => {
                        return request(app)[method]("/api/episodes").expect(405).then(({ body: { msg } }) => {
                            expect(msg).toBe('Invalid Method');
                        })
                    })
                    return Promise.all(methodPromises);
                })
            })
            describe('/:episode_id', () => {
                describe('GET', () => {
                    it('200: returns an episode object that returns the correct keys', () => {
                        return request(app).get('/api/episodes/1').expect(200).then(({ body : { episodeData } }) => {
                            expect(episodeData).toHaveProperty('title');
                            expect(episodeData).toHaveProperty('season');
                            expect(episodeData).toHaveProperty('episode');
                            expect(episodeData).toHaveProperty('description');
                            expect(episodeData).toHaveProperty('disneyplus_id');
                            expect(episodeData).toHaveProperty('simpsonsworld_id');
                            expect(episodeData).toHaveProperty('episode_id');
                            expect(episodeData).toHaveProperty('good');
                            expect(episodeData).toHaveProperty('characters');
                            expect(Array.isArray(episodeData.characters)).toBe(true);
                            expect(episodeData.title).toBe("Episode 1");
                        })
                    })
                    it('400: if passed non existent episode_id', () => {
                        return request(app).get('/api/episodes/100').expect(400).then(({ body : { msg } }) => {
                            expect(msg).toBe('no episode found')
                        })
                    })
                    it('400: if passed invalid episode_id type', () => {
                        return request(app).get('/api/episodes/banana').expect(400).then(({ body: { msg } }) => {
                            expect(msg).toBe('no episode found');
                        })
                    })
                }) 
                describe('Invalid Method', () => {
                    it('405: if passed invalid method', () => {
                        const invalidMethods = ['put', 'delete', 'patch', 'post']
                        const methodPromises = invalidMethods.map(method => {
                            return request(app)[method]("/api/episodes/1").expect(405).then(({ body: { msg } }) => {
                                expect(msg).toBe('Invalid Method');
                            })
                        })
                        return Promise.all(methodPromises);
                    })
                }) 
            })    
        })
        describe('/characters', () => {
            describe('GET', () => {
                it('200: returns an array of characters', () => {
                    return request(app).get('/api/characters').expect(200).then(({ body : { characters } }) => {
                        expect(Array.isArray(characters)).toBe(true);
                        expect(characters[0]).toHaveProperty('character_id');
                        expect(characters[0]).toHaveProperty('character_full_name');
                        expect(characters[0]).toHaveProperty('character_short_name');
                    })
                })
                it('200: accepts a nameContains query that filters results by given string', () => {
                    return request(app).get('/api/characters?nameContains=two').expect(200).then(({ body : { characters } }) => {
                        expect(characters.length).toBe(1);
                        expect(characters[0].character_full_name).toBe("number two")
                    })
                })
                it('200: returns empty array if nameContains value doesn\'t exist', () => {
                    return request(app).get('/api/characters?nameContains=banana').expect(400).then(({ body : { msg } })=> {
                        expect(msg).toBe('no episode found');
                    })
                })
                it('200: accepts a limit query (default: 10) wich returns defined number of results', () => {
                    return request(app).get('/api/characters/?limit=3').expect(200).then(({ body: { characters } }) => {
                        expect(characters.length).toBe(3);
                    })
                })
                it('200: accepts a p query which specifiest which paget to start at calculated using limit', () => {
                    return request(app).get('/api/characters?limit=5&p=2').expect(200).then(({ body: { characters } }) => {
                        expect(characters.length).toBe(2);
                    })
                })
                it('200: defaults offset to 0 if passed invalid p type', () => {
                    return request(app).get('/api/characters/?limit=6&p=cat').expect(200).then(({ body: { characters } }) => {
                        expect(characters.length).toBe(6);
                    })
                })
                it('200: has a total_count property displaying total count of articles before limit', () => {
                    return request(app).get('/api/characters?limit=3').expect(200).then(({ body }) => {
                        expect(body).toHaveProperty('total_count');
                        expect(body.total_count).toBe(7);
                    })
                })
                it('200: default sorts to character_id (default order desc)', () => {
                    return request(app).get('/api/characters/').expect(200).then(({ body: { characters } }) => {
                        expect(characters[0].character_id).toBe(7);
                    })
                })
                it('200: sorts the articles by any valid column (default order desc)', () => {
                    return request(app).get('/api/characters/?sort_by=character_full_name').expect(200).then(({ body: { characters } }) => {
                        expect(characters[0].character_full_name).toBe('number two');
                    })
                })
                it('200: orders article by asc or desc from order query', () => {
                    return request(app).get('/api/characters/?order=asc').expect(200).then(({ body: { characters } }) => {
                        expect(characters[0].character_id).toBe(1);
                    })
                })
                it('400: when passed a column that does not exist in sort_by query', () => {
                    return request(app).get('/api/characters?sort_by=doots').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    })
                })
                it('200: order query defaults to desc if query is not asc or desc', () => {
                    return request(app).get('/api/characters?order=doots').expect(200).then(({ body: { characters } }) => {
                        expect(characters[0].character_id).toBe(7);
                    })
                })
                it('200: defaults to 10 if passed invalid limit type', () => {
                    return request(app).get('/api/characters?limit=banana').expect(200).then(({ body: { characters } }) => {
                        expect(characters.length).toBe(7);
                    })
                })
                it('200: defaults to 10 if passed limit < 0', () => {
                    return request(app).get('/api/characters?limit=-1').expect(200).then(({ body: { characters } }) => {
                        expect(characters.length).toBe(7);
                    })
                })
            })
            describe('Invalid Method', () => {
                it('405: if passed invalid method', () => {
                    const invalidMethods = ['put', 'delete', 'patch', 'post']
                    const methodPromises = invalidMethods.map(method => {
                        return request(app)[method]("/api/characters").expect(405).then(({ body: { msg } }) => {
                            expect(msg).toBe('Invalid Method');
                        })
                    })
                    return Promise.all(methodPromises);
                })
            })
            describe('/:character_id', () => {
                describe('GET', () => {
                    it('200: returns a character object with the correct keys', () => {
                        return request(app).get('/api/characters/1').expect(200).then(({ body: { character } }) => {
                            expect(character).toHaveProperty('character_id')
                            expect(character).toHaveProperty('character_full_name')
                            expect(character).toHaveProperty('character_short_name')
                            expect(character).toHaveProperty('episodes')
                            expect(Array.isArray(character.episodes)).toBe(true)
                            expect(character.episodes[0]).toHaveProperty('title')
                            expect(character.episodes[0]).toHaveProperty('episode_id')
                        })
                    })
                    it('400: if passed non existent character_id', () => {
                        return request(app).get('/api/characters/100').expect(400).then(({ body : { msg } }) => {
                            expect(msg).toBe('no episode found')
                        })
                    })
                    it('400: if passed invalid character_id type', () => {
                        return request(app).get('/api/characters/banana').expect(400).then(({ body: { msg } }) => {
                            expect(msg).toBe('no episode found');
                        })
                    })
                })
                describe('Invalid Method', () => {
                    it('405: if passed invalid method', () => {
                        const invalidMethods = ['put', 'delete', 'patch', 'post']
                        const methodPromises = invalidMethods.map(method => {
                            return request(app)[method]("/api/characters/1").expect(405).then(({ body: { msg } }) => {
                                expect(msg).toBe('Invalid Method');
                            })
                        })
                        return Promise.all(methodPromises);
                    })
                })
            })
        })
    })
})