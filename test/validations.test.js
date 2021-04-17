import {SenderValidation, ReceiverValidation} from '../models/validation.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const {
    expect
} = chai;


chai.use(chaiHttp);

describe('Validations', () => {
    beforeEach(async () => {
        await SenderValidation.deleteMany({});
        await ReceiverValidation.deleteMany({});
    })

    describe('/GET validations', () => {
        it('it should return all sender and receiver validations', async () => {
            chai.request(app)
                .get('/validations')
                .then((res) => {
                    expect(res.success).to.be.true;
                    expect(res.data).to.haveOwnProperty('senderValidations');
                    expect(res.data).to.haveOwnProperty('receiverValidations');
                });
        });
    });
});