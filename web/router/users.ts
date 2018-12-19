import router from 'restify-router';
import { Request } from 'restify';
import errors from 'restify-errors';
import { getManager } from 'typeorm';

import { User } from '../entities/user';

const userRouter = new router.Router();

userRouter.get('/user', async (req: Request, res, next) => {
    const manager = getManager();
    const users = await manager.find(User);
    res.json(users);
    next();
});

userRouter.get('/user/:id', async (req: Request, res, next) => {
    const id = req.params.id;
    const manager = getManager();
    const user = await manager.findOne(User, id);
    res.json(user);
    next();
});

userRouter.post('/user', async (req: Request, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: false
    };
    const manager = getManager();
    const result = await manager.save(User, user);
    res.json(result);
});

userRouter.put('/user/:id', (req, res) => {
    res.json('good');
});

userRouter.get('/user/error', (req, res, next) => {
    res.send(new errors.InternalServerError('BIG BANG BOOM!!!'));
    next();
});

export default userRouter;