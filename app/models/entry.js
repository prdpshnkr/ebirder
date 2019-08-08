const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema // OCF
const EntrySchema = new Schema({
  bird: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  lattitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  // strength: [
  //   {
  //     total: {
  //       type: Number,
  //       required: true
  //     },
  //     adult: {
  //       type: Number,
  //       default: 0
  //     },
  //     juvenile: {
  //       type: Number,
  //       default: 0
  //     },
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now() 
  }
})

const Entry = mongoose.model('Entry', EntrySchema) // OCF

module.exports = Entry