// @ts-ignore
import request from 'supertest';
import { getManager } from 'typeorm';
import Chance from 'chance';

import initApp from '../web/server-rest';
import { User } from '../web/entities/user';
import config from 'config';

let server: any;
const invalidToken = 'invalidToken.invalidToken.invalidToken';
let validToken: string;
const chance = new Chance();
const validUser = () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    password: chance.word({length: 6}),
    email: chance.email(),
});

beforeAll(async () => {
    server = await initApp();
    validToken = await request(server)
        .post('/auth')
        .send({username: config.get<User>('admin').email, password: config.get<User>('admin').password})
        .then(response => response.body.token);
});

afterAll(() => {
    server.close();
});

describe('POST /user', () => {
    test('should return 200 OK', () => {
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${validToken}`)
            .send(validUser())
            .expect(200);
    });
    test('should hash <password> field for user entity', () => {
        const userToAdd = validUser();
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${validToken}`)
            .send(userToAdd)
            .expect(200)
            .then(async response => {
                const manager = getManager();
                const user = await manager.findOne(User, response.body.id);
                expect(user.password).not.toBe(userToAdd.password);
            });
    });
    test('should return 400 if validation is failed', () => {
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                ...validUser(),
                firstName: 'A'
            }).expect(400);
    });
    test('thrown 401 error if the token is not valid', async () => {
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send(validUser()).expect(401);
    });
});

describe('GET /user/:id', () => {
    test('should return 200 OK', () => {
        return request(server)
            .get('/user/1')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(200);
    });
    test('should return user entity without <password> field', () => {
        return request(server)
            .get('/user/1')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(200)
            .then(response => expect(response.body.password).toBeUndefined());
    });
    test('should return 204 - no content', () => {
        return request(server)
            .get('/user/100000')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(204);
    });
    test('thrown 401 error if the token is not valid', async () => {
        return request(server)
            .get('/user/1')
            .set('Authorization', `Bearer ${invalidToken}`)
            .expect(401);
    });
});

describe('GET /user', () => {
    test('should return 200 OK', () => {
        return request(server)
            .get('/user')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(200);
    });
    test('thrown 401 error if the token is not valid', async () => {
        return request(server)
            .get('/user')
            .set('Authorization', `Bearer ${invalidToken}`)
            .expect(401);
    });
});
