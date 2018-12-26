import jwt from 'jsonwebtoken';
import request from 'supertest';
import { Server } from 'restify';

import initApp from '../web/server-rest';

const secret = 'secret';
let server: Server;


beforeAll(async () => {
    server = await initApp();
});

afterAll(() => {
    server.close();
});

describe('jsonwebtoken', () => {
    test('should return payload after verifying', () => {
        const token = jwt.sign({user: 'moshe'}, secret);
        const res: any = jwt.verify(token, secret);
        expect(res.user).toBe('moshe');
    });
    test('Thrown error if the token is expired', async () => {
        const token = jwt.sign({user: 'moshe'}, secret, {expiresIn: -1});
        expect(() => jwt.verify(token, secret)).toThrow('jwt expired');
    });
});

describe('POST /auth', () => {
    xtest('return 200 username and password are valid', () => {
        throw new Error();
    });
    test('return 403 if username is wrong', () => {
        return request(server)
            .post('/auth')
            .send({username: 'not-existed-user', password: 'zzz'})
            .expect(403);
    });
    xtest('return 403 if password is wrong', () => {
        throw new Error();
    });
});