import restify, { Server } from 'restify';
import config from 'config';

import userRouter from './router/users';

const getRouters = () => [userRouter];

function createServer(routers: { applyRoutes: (server: Server, prefix?: String) => void }[]): Server {
    const server = restify.createServer();
    routers.forEach(router => router.applyRoutes(server));
    return server;
}

createServer(getRouters())
    .listen(config.get('web.port'), () => {
        console.log(`App is running on port: ${config.get('web.port')}`);
        console.log(`Press CTRL-C to stop\n`);
    });
