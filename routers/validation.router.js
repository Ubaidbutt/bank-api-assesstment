'use strict';

import express from 'express';
const validationRouter = express.Router();

import {getAllValidations} from '../controllers/validation.controller.js';

validationRouter.get('/', getAllValidations);

export default validationRouter;