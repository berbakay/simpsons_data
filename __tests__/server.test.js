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
            describe('GET', () => {
                it.only('200: returns an episode object that returns the correct keys', () => {
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
            })
        })
    })
})