import express from 'express';
import cors = require('cors');
import * as rootController from './controller/root.controller';

const app = express();

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.get('/', rootController.index);

export default app;