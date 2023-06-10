const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const exerciseSchema = require('./Exercise');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedExercise: [exerciseSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
}) 

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('exerciseFrequency').get(function() {
      return this.savedExercise.length
  }
)

const User = model('User', userSchema);

module.exports = User;
