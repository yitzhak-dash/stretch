import jwt from 'jsonwebtoken';
import request from 'supertest';
import { Server } from 'restify';
import config from 'config';

import initApp from '../web/server-rest';
import { User } from '../web/entities/user';

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
    test('return 200 username and password are valid', () => {
        const defaultUser: User = config.get<User>('admin');
        return request(server)
            .post('/auth')
            .send({username: defaultUser.email, password: defaultUser.password})
            .expect(200);
    });
    test('return 403 if username is wrong', () => {
        const defaultUser: User = config.get<User>('admin');
        return request(server)
            .post('/auth')
            .send({username: 'a' + defaultUser.email, password: defaultUser.password})
            .expect(403);
    });
    test('return 403 if password is wrong', () => {
        const defaultUser: User = config.get<User>('admin');
        return request(server)
            .post('/auth')
            .send({username: defaultUser.email, password: 'a' + defaultUser.password})
            .expect(403);
    });
});