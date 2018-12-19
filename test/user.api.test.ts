// @ts-ignore
import request     from 'supertest';
import * as expect from 'chai';
import server      from '../web/server-rest';

describe('GET /user/:id', () => {
    it('should return 200 OK', () => {
        return request(server)
            .get('/user/1')
            .expect(200);
    });
    it('should return user <moshe>', () => {
        return request(server)
            .get('/user/1')
            .expect(200)
            .then(response => {
                expect.expect(response.body).to.equal('moshe');
            });
    });
});
