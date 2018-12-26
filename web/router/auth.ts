import router from 'restify-router';
import jwt from 'jsonwebtoken';
import config from 'config';
import { getManager } from 'typeorm';
import errors from 'restify-errors';

import { User } from '../entities/user';
import { compare } from '../services/auth.service';

const authRouter = new router.Router();

authRouter.post('/auth', async (req, res, next) => {
    const {username, password} = req.body;
    const user = await getManager()
        .createQueryBuilder(User, 'user')
        .where('user.email = :username', {username})
        .addSelect('user.password')
        .getOne();
    if (!user || !compare(password, user.password)) {
        return next(new errors.ForbiddenError());
    }
    const token = jwt.sign({username}, config.get('jwt.secret'), {expiresIn: config.get('jwt.expiresIn')});
    const decoded = jwt.verify(token, config.get('jwt.secret')) as any;
    res.send({
        iat: decodeUnixTime(decoded.iat),
        exp: decodeUnixTime(decoded.exp),
        token
    });
});

const decodeUnixTime = (unixTime: number = 0): Date => new Date(unixTime * 1000);


export default authRouter;