'use strict';

import Bank from '../models/bank.model.js';

/*
    The create bank API route is complicated and shouldn't be implemented the way it is. I only did it because it is asked
        of me in the assignment.
    Otherwise, a cleaner approach would require different routes for different purposes:
    - POST (/banks) - create a bank (making sure the bank and branches have valid code incrementing logic)
    - PATCH ('/banks/:bankId) - update the bank with the bankId
*/
const createBank = async (req, res) => {
    try {
        // If the _id field exists in the body, find the bank and update that record
        if (req.body._id) {
            const updatedBank = await Bank.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, {new: true, useFindAndModify: false})
            return res.status(204).send({success: true, data: updatedBank})
        }
        // Find the bank with name and code to see if it matches
        const bank = await Bank.findOne({name: req.body.name, code: req.body.code})
        // if there is no bank already, create a new bank
        if (!bank) {
            // Find the banks where name and branch already exists
            // The descending sorting is to find the bank that was created at the last so we can increment the code based on it
            const bank = await Bank.find({name: req.body.name, branch: req.body.branch}).sort('-createdAt')
            let code = 1 // Default code 1
            if(bank[0]) { // if the bank exist, increment the code by 1 from the last value
                code = (bank[0].code) + 1
            }
            // create the bank 
            const {name, state, branch, address} = req.body;
            const createdBank = await Bank.create({name, state, branch, address, code});
            return res.status(201).send({success: true, data: createdBank});
        } else { // The bank-code match exist so update the same record
            const updatedBank = await Bank.findOneAndUpdate({_id: bank._id}, {$set: req.body}, {new: true, useFindAndModify: false})
            return res.status(204).send({success: true, data: updatedBank})
        }
    } catch(err) {
        if (err.name == 'ValidationError') {
            res.statusCode = 422;
        } else {
            res.statusCode = 500;
        }
        return res.send({success: false, error: err.message});
    }
}

// This route supports query parameters for filtering the bank list 
// You can pass in any combination of query params with values and it will filter the records accordingly
const getAllBanks = async (req, res) => {
    try {
        const queryParams = req.query;
        const banks = await Bank.find(queryParams).lean();
        return res.status(200).send({success: true, data: banks});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message});
    }
}

export {createBank, getAllBanks};