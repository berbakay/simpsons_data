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
            it ('200: returns a console log', () => {
                return request(app).get('/api').expect(200).then(({ body: { msg } }) => {
                    expect(msg).toBe('tests are working');
                })
            })
        })
        describe('/episode', () => {
            describe('GET', () => {
                it('200: returns an episode object that returns the correct keys', () => {
                    return request(app).get('/api/episode').expect(200).then(({ body : { episodeData } }) => {
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
                    return request(app).get('/api/episode?isGood=false').expect(200).then(({ body : { episodeData } }) => {
                        console.log(episodeData.good)
                        expect(episodeData.good).toBe(false);
                    })
                })
                it('200: accepts a minSeason query that only returns episodes in seasons greater than or equal to that number', () => {
                    return request(app).get('/api/episode?minSeason=4').expect(200).then(({ body: { episodeData } }) => {
                        console.log(episodeData.season);
                        expect(episodeData.season).toBeGreaterThan(3);
                    })
                })
                it('200: accepts a maxSeason query that only returns episodes in seasons less than or equal to that number', () => {
                    return request(app).get('/api/episode?maxSeason=1').expect(200).then(({ body: { episodeData } }) => {
                        console.log(episodeData.season);
                        expect(episodeData.season).toBeLessThan(2);
                    })
                })
                it('400: if minSeason > number of seasons', () => {
                    return request(app).get('/api/episode?minSeason=7').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason < 1', () => {
                    return request(app).get('/api/episode?maxSeason=0').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('400: if maxSeason <  minSeason', () => {
                    return request(app).get('/api/episode?minSeason=10&maxSeason=5').expect(400).then(({ body: { msg } }) => {
                        expect(msg).toBe('no episode found');
                    }) 
                })
                it('200: if passed non int for min season', () => {
                    return request(app).get('/api/episode?minSeason=cat').expect(200)
                })
                it('200: if passed non int for max season', () => {
                    return request(app).get('/api/episode?maxSeason=cat').expect(200)
                })
                it('200: ignores isGood query if passed non bool', () => {
                    return request(app).get('/api/episode?isGood=banana').expect(200)
                }) 
            })
            describe('Invalid Method', () => {
                it('405: if passed invalid method', () => {
                    const invalidMethods = ['put', 'delete', 'patch', 'post']
                    const methodPromises = invalidMethods.map(method => {
                        return request(app)[method]("/api/episode").expect(405).then(({ body: { msg } }) => {
                            expect(msg).toBe('Invalid Method');
                        })
                    })
                    return Promise.all(methodPromises);
                })
            })
            describe('/:character_id', () => {
                describe.only('GET', () => {
                    it('200: returns an episode object containing character', () => {
                        return request(app).get('/api/episode/1').expect(200).then(({ body : { episodeData } }) => {
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
                        expect(episodeData.characters).toContain("number one");
                        })
                    })
                    it('400: if character id doesn\'t exist', () => {
                        return request(app).get('/api/episode/10').expect(400).then(({ body : { msg } }) => {
                            expect(msg).toBe('no episode found');
                        })
                    })
                    it('400: if passed invalid character id type', () => {
                        return request(app).get('/api/episode/banana').expect(400).then(({ body : { msg } }) => {
                            expect(msg).toBe('no episode found');
                        })
                    })
                })
            })
        })
    })
})