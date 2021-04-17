'use strict';

import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);


/* Since we just need two different collections for the dummy API call. So, I am creating two mongoose model from the
    same schema in a single file because both of the collectons looks similar.
    In a real scenario, these models will have their own specific schemas in their relevant files.
*/
const SenderValidation = mongoose.model('senderValidation', schema);
const ReceiverValidation = mongoose.model('receivervalidation', schema);

export {SenderValidation, ReceiverValidation};