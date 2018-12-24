// @ts-ignore
import request from 'supertest';
import jwt from 'jsonwebtoken';

import initApp from '../web/server-rest';

let server: any;
const invalidToken = 'invalidToken.invalidToken.invalidToken';
let validToken: string;

beforeAll(async () => {
    server = await initApp();
    validToken = await request(server).post('/auth')
        .send({username: 'moshe', password: 'pas$w0rd'})
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
            .send({
                'firstName': 'Avi',
                'lastName': 'Perez'
            }).expect(200);
    });
    test('should return 400 if validation is failed', () => {
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                'firstName': 'A',
                'lastName': 'Perez'
            }).expect(400);
    });
    test('thrown 401 error if the token is not valid', async () => {
        return request(server)
            .post('/user')
            .set('Authorization', `Bearer ${invalidToken}`)
            .send({
                'firstName': 'Avi',
                'lastName': 'Perez'
            }).expect(401);
    });
});

describe('GET /user/:id', () => {
    test('should return 200 OK', () => {
        return request(server)
            .get('/user/1')
            .set('Authorization', `Bearer ${validToken}`)
            .expect(200);
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
