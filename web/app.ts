import express from 'express';
import config from 'config';

const app = express();
app.set('port', config.get('web.port'));

export default app;
