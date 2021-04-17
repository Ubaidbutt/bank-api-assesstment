'use strict'

import express from 'express';
const app = express();

import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import bankRouter from './routers/bank.router.js';
import validationRouter from './routers/validation.router.js';

import config from './configuration/config.js';

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongodb connected at PORT 27017.');
        app.listen(config.port, () => {
            console.log(`The server is listening at PORT ${config.port}`)
        });
    })
    .catch((err) => console.log('Mongodb connection error: ', err.message));

app.use(bodyParser.json());

app.use('/banks', bankRouter)
app.use('/validations', validationRouter)
app.use((req, res) => {
    return res.status(404).send({success: false, error: 'The requested URL not found.'});
});

export default app;