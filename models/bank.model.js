'use strict';

import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    state: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        default: 0
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Bank = mongoose.model('Bank', schema);

export default Bank;