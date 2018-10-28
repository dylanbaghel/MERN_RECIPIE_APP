const request = require('supertest');
const{ User } = require('./../model/User');
const mongoose = require('mongoose');
let server;

beforeEach(() => {
});

afterEach(async () => {
    await User.remove({});
});

beforeAll(() => {
    server = require('./../server').server;
});

afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
});

describe('/users', () => {
    describe('POST /users', () => {
        test('should create new user', async () => {
            const payload = {
                fullName: 'dylan',
                email: 'dylan@example.com',
                password: 'abhishek'
            };
            const res = await request(server)
                                .post('/users')
                                .send(payload);
            expect(res.status).toBe(200);
        })
    });
});

