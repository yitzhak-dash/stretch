import jwt from 'jsonwebtoken';

const secret = 'secret';
describe('jsonwebtoken', () => {
    test('should return payload after verifying', () => {
        const token = jwt.sign({user: 'moshe'}, secret);
        const res: any = jwt.verify(token, secret);
        expect(res.user).toBe('moshe');
    });
    test('Thrown error if the token is expired', async () => {
        const token = jwt.sign({user: 'moshe'}, secret, {expiresIn: 1});
        jest.setTimeout(1100);
        try {
            await jwt.verify(token, secret);
        } catch (err) {
            expect(err.nackCount).toBe('TokenExpiredError');
        }
    });
});