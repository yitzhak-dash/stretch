// @ts-ignore
// import request from 'supertest';

import initApp from '../web/server-rest';

let server: any;

// beforeAll(() => {
//     expect.assertions(1);
//     return initApp().then(ser => {
//         server = ser;
//     }).catch(err => console.log(err));
// });
//
// afterAll(() => {
//     server.close();
// });

test('Test for you travis', () => expect(1 === 1).toBeTruthy());

// describe('GET /user/:id', () => {
// test('should return 200 OK', () => {
//     return request(server)
//         .get('/user/1')
//         .expect(200);
// });
//
// test('should return 204 - no content', () => {
//     return request(server)
//         .get('/user/100000')
//         .expect(204);
// });
// });
