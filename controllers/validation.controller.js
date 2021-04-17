'use strict';

import {SenderValidation, ReceiverValidation} from '../models/validation.model.js'

const getAllValidations = async (req, res) => {
    try {
        const senderValidations = await SenderValidation.find({}).lean()
        const receiverValidations = await ReceiverValidation.find({}).lean()
        return res.status(200).send({success: true, data: {senderValidations, receiverValidations}})
    } catch(err) {
        return res.status(500).send({success: false, error: err.message})
    }
} 

export {getAllValidations};