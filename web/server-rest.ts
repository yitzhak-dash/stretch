import restify, { Server } from 'restify';
import config from 'config';
import routers from './router/index';


function createServer(routers: { applyRoutes: (server: Server, prefix?: String) => void }[] = []): Server {
    const server = restify.createServer();
    routers.forEach(router => router.applyRoutes(server));
    return server;
}

createServer(routers)
    .listen(config.get('web.port'), () => {
        console.log(`App is running on port: ${config.get('web.port')}`);
        console.log(`Press CTRL-C to stop\n`);
    });
