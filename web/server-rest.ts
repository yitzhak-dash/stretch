import 'reflect-metadata';
import restify, { Server } from 'restify';
import config from 'config';
import jwt from 'jsonwebtoken';

const rjwt = require('restify-jwt-community');

import routers from './router/index';
import { connect } from './data-store/connector';
import { getConnection, getConnectionManager } from 'typeorm';

let server: Server;

async function initApp() {
    server = createServer(routers).listen(config.get('web.port'), onListen);
    try {
        const isConnected = getConnectionManager().has('default');
        if (!isConnected) {
            await connect();
        }
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
        getConnection().close();
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
    routers.forEach(router => router.applyRoutes(server));
    return server;
}

export default initApp;