'use strict';

import express from 'express';
const bankRouter = express.Router();

import {createBank, getAllBanks} from '../controllers/bank.controller.js';

bankRouter.post('/', createBank);
bankRouter.get('/', getAllBanks);

export default bankRouter;