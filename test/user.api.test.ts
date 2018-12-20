// @ts-ignore
import request from 'supertest';

import initApp from '../web/server-rest';

let server: any;

beforeAll(async () => {
    server = await initApp();
});

afterAll(() => {
    server.close();
});

describe('POST /user', () => {
    test('should return 200 OK', () => {
        return request(server)
            .post('/user')
            .send({
                'firstName': 'Avi',
                'lastName': 'Perez'
            }).expect(200);
    });
    test('should return 404 when validation is failed', () => {
        return request(server)
            .post('/user')
            .send({
                'firstName': 'A',
                'lastName': 'Perez'
            }).expect(404);
    });
});

describe('GET /user/:id', () => {
    test('should return 200 OK', () => {
        return request(server)
            .get('/user/1')
            .expect(200);
    });

    test('should return 204 - no content', () => {
        return request(server)
            .get('/user/2')
            .expect(204);
    });
});
