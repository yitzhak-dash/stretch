import jwt from 'jsonwebtoken';

const secret = 'secret';
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
    xtest('return 400 if username is not valid', () => {
        throw new Error();
    });
    xtest('return 400 if password is not valid', () => {
        throw new Error();
    });
});