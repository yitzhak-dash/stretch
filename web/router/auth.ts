import router from 'restify-router';
import jwt from 'jsonwebtoken';
import config from 'config';

const authRouter = new router.Router();

authRouter.post('/auth', (req, res, next) => {
    const {username, password} = req.body;
    // todo: validate username and password and then:
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