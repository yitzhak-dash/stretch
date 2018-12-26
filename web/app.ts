import initApp from './server-rest';

process.on('uncaughtException', function (err) {
    console.error(err);
});


(async () => await initApp())();