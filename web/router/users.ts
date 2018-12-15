import router from 'restify-router';
import errors from 'restify-errors';

const userRouter = new router.Router();

userRouter.get('/user', (req, res, next) => {
    res.json(['moshe', 'avi']);
    next();
});

userRouter.get('/user/:id', (req, res, next) => {
    res.json('moshe');
    next();
});

userRouter.post('/user', (req, res) => {
    res.json('good');
});

userRouter.put('/user/:id', (req, res) => {
    res.json('good');
});

userRouter.get('/user/error', (req, res, next) => {
    res.send(new errors.InternalServerError('BIG BANG BOOM!!!'));
    next();
});

export default userRouter;