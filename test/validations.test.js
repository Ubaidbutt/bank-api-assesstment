import {SenderValidation, ReceiverValidation} from '../models/validation.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Validations', () => {
    before(async () => {
        await SenderValidation.deleteMany({});
        await ReceiverValidation.deleteMany({});
    })

    describe('/GET validations', () => {
        it('should return all sender and receiver validations', async () => {
            try {
                const res = await chai.request(app).get('/validations');
                res.should.have.status(200);
                res.body.data.should.be.a('object');
            } catch(err) {
                throw new Error(err);
            }
        });
    });
});