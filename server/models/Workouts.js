const { Schema } = require('mongoose');

const workoutSchema = new Schema({
    workoutId: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
    },
    reps: {
        type: String,
    },
});

module.exports = workoutSchema;