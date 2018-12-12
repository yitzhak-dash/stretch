import errorHandler from 'errorhandler';

import app from './app';

app.use(errorHandler());

app.listen(app.get('port'), () => {
    console.log(`App is running on port: ${app.get('port')}`);
    console.log(`Press CTRL-C to stop\n`);
});