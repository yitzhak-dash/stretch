import router from 'restify-router';
import { Next, Request, Response } from 'restify';
import { getManager } from 'typeorm';
import * as _ from 'lodash';

import { User } from '../entities/user';
import validator from '../services/request-validator';
import { sendValidationError } from './router-helper';
import { hash } from '../services/auth.service';
import { saveUser } from '../services/user.service';

const userRouter = new router.Router();

userRouter.get('/user', async (req: Request, res, next) => {
    const manager = getManager();
    const users = await manager.find(User);
    res.json(users);
    next();
});

userRouter.get('/user/:id', async (req: Request, res: Response, next) => {
    const id = req.params.id;
    const manager = getManager();
    const user = await manager.findOne(User, id);
    if (_.isEmpty(user)) {
        return res.send(204);
    }
    res.json(user);
    next();
});

userRouter.post('/user', async (req: Request, res: Response, next: Next) => {
    const validationStatus = validator().validateUser(req.body);
    if (validationStatus.error) {
        return sendValidationError(next, validationStatus);
    }
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash(req.body.password),
        isActive: false
    } as User;
    const result = saveUser(user);
    res.json(result);
    next();
});

userRouter.put('/user/:id', (req, res) => {
    res.json('good');
});


export default userRouter;