import userRouter from './users';
import authRouter from './auth';

// add here defined routers
const createRouters = () => [authRouter, userRouter];

export default createRouters();