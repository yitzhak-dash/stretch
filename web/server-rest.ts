import 'reflect-metadata';
import restify, { Server } from 'restify';
import config from 'config';
import jwt from 'jsonwebtoken';

const rjwt = require('restify-jwt-community');

import routers from './router/index';
import { connect } from './data-store/connector';

let server: Server;

async function initApp() {
    server = createServer(routers).listen(config.get('web.port'), onListen);
    try {
        await connect();
        console.log('DB connected');
    } catch (err) {
        console.error(err.message);
        closeServerAndExit();
    }
    return server;
}

function closeServerAndExit() {
    server.close(() => {
        console.log('App is stopped');
        // process.exit(1);
    });
}

const onListen = () => {
    console.log(`App is running on port: ${config.get('web.port')}`);
    console.log(`Press CTRL-C to stop\n`);
};

function applyPlugins(server: Server) {
    server.pre(restify.plugins.pre.sanitizePath());
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.queryParser());
    server.use(rjwt(config.get('jwt')).unless({path: ['/auth']}));
}

function createServer(routers: { applyRoutes: (server: Server, prefix?: String) => void }[] = []): Server {
    const server = restify.createServer();
    applyPlugins(server);
    server.post('/auth', (req, res, next) => {
        let {username, password} = req.body;
        // todo: validate username and password and then:
        const token = jwt.sign({username}, config.get('jwt.secret'), {expiresIn: config.get('jwt.expiresIn')});
        const decoded = jwt.verify(token,config.get('jwt.secret') ) as any;
        res.send({iat: new Date(decoded.iat * 1000), exp: new Date(decoded.exp * 1000), token});
    });
    routers.forEach(router => router.applyRoutes(server));
    return server;
}

export default initApp;