import restify from 'restify';
import config from 'config';


const server = restify.createServer();

server.get('/', (req, res, next) => {
    res.json('hello');
    next();
});

server.listen(config.get('web.port'), () => {
    console.log(`App is running on port: ${config.get('web.port')}`);
    console.log(`Press CTRL-C to stop\n`);
});
