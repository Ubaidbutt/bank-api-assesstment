import Bank from '../models/bank.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const {
    expect
} = chai;


chai.use(chaiHttp);

describe('Banks', async () => {
    beforeEach(async () => {
        await Bank.deleteMany()
    });

    describe('/GET banks', () => {
        it('it should get all banks', async () => {
            chai.request(app)
                .get('/banks')
                .then((res) => {
                    expect(res.success).to.be.true;
                    expect(res.data).to.be.a('array');
                    expect(res.data.length).to.equal(0);
                });
        });
    });

    describe('/POST banks', () => {
        it(`it should create a bank if one doesn't exist already`, async () => {
            const bank = {
                name: 'HBL',
                state: 'Punjab',
                address: 'Lahore, main buleward',
                branch: 'DHA phase-4'
            };

            chai.request(app)
                .post('/banks')
                .send(bank)
                .then((res) => {
                    expect(res.success).to.be.true;
                    expect(res.data).to.haveOwnProperty('_id');
                });
        });
    });

    describe('/POST banks - Update', () => {
        it('should update the existing record if the name-code fields matches the record', async () => {
            const bank = {
                name: 'HBL',
                state: 'Punjab',
                address: 'DHA phase-4 EE street 9 house 316',
                branch: 'DHA phase-4',
                code: 1
            };
            chai.request(app)
                .post('/banks')
                .send(bank)
                .then((res) => {
                    expect(res.success).to.be.true;
                    expect(res.data).to.haveOwnProperty('name');
                    expect(res.data).to.equal(bank.code++);
                });
        });
    });
});