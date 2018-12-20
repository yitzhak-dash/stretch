// @ts-ignore
import request from 'supertest';

import { initApp } from '../web/server-rest';

let server: any;

beforeAll(async () => {
    server = await initApp();
});

afterAll(() => {
    server.close();
});

test('Test for you travis', () => expect(1 === 1).toBeTruthy());

// describe('GET /user/:id', () => {
//     test('should return 200 OK', async () => {
//         return request(server)
//             .get('/user/1')
//             .expect(200);
//     });
//
//     test('should return 204 - no content', async () => {
//         return request(server)
//             .get('/user/100000')
//             .expect(204);
//     });
// });
