'use strict';

import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongodbUrl: process.env['MONGODB_URL'] || 'mongodb://localhost:27017/banks',
    port: process.env['PORT'] || 4200
}

export default config;