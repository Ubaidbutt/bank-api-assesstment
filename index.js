'use strict'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import bankRouter from './routers/bank.router.js'
import validationRouter from './routers/validation.router.js'

import config from './configuration/config.js'

mongoose.connect(config.mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongodb connected at PORT 27017.')
    })
    .catch((err) => console.log('Mongodb connection error: ', err.message))

const app = express()

app.use(bodyParser.json())

app.use('/banks', bankRouter)
app.use('/validations', validationRouter)

app.listen(config.port, () => {
    console.log(`The server is listening at PORT ${config.port}`)
})