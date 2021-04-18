import Bank from '../models/bank.model.js';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const should = chai.should();

chai.use(chaiHttp);

describe('Banks', async () => {
    before(async () => {
        await Bank.deleteMany();
    });

    describe('/GET banks', () => {
        it('should GET all the books', async () => {
            try {
                const res = await chai.request(app).get('/banks');
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(0);
            } catch(err) {
                throw new Error(err);
            }
        });
    });

    describe('/POST banks', () => {
        it(`should create a bank if one doesn't exist already`, async () => {
            const bank = {
                name: 'HBL',
                state: 'Punjab',
                address: 'Lahore, main buleward',
                branch: 'DHA phase-4'
            };

            try {
                const res = await chai.request(app).post('/banks').send(bank);
                res.should.have.status(201);
                res.body.data.should.be.a('object');
                res.body.data.should.haveOwnProperty('name');
            } catch (err) {
                throw new Error(err);
            }
        });

        it(`should throw an error if name is not provided in the body`, async () => {
            const bank = {
                state: 'Punjab',
                address: 'Lahore, main buleward',
                branch: 'DHA phase-4'
            };

            try {
                const res = await chai.request(app).post('/banks').send(bank);
                res.should.have.status(422);
                res.body.should.haveOwnProperty('error');
            } catch (err) {
                throw new Error(err);
            }
        });
    });

    describe('/POST banks - Update', () => {
        it('should update the existing record if the name-code combinatio exists and increment the code', async () => {
            const bank = {
                name: 'HBL',
                state: 'Punjab',
                address: 'DHA phase-4 EE street 9 house 316',
                branch: 'DHA phase-4'
            };
            try {
                const res = await chai.request(app).post('/banks').send(bank)
                res.should.have.status(201);
                res.body.data.should.be.a('object');
                res.body.data.code.should.equal(2);
            } catch (err) {
                throw new Error(err);
            }
        });
    });
});