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
    })
})