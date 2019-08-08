const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: () => 'Invalid Email Format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  tokens: [
    {
      token: {
        type: Date,
        default: Date.now()
      }
    }
  ]
})

const user = mongoose.model('user', userSchema)

