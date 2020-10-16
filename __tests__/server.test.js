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
        describe('GET', () => {
            it ('200: returns a console log', () => {
                return request(app).get('/api').expect(200).then(({ body: { msg } }) => {
                    expect(msg).toBe('tests are working');
                })
            })
        })
        describe('/episode', () => {
            describe.only('GET', () => {
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
            })
        })
    })
})