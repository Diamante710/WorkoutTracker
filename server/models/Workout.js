const { Schema } = require('mongoose');

const workoutSchema = new Schema({
    workoutId: {
        type: String,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
    },
    goalWeight: {
        type: String,
    },
    reps: {
        type: String,
    },
    goalReps: {
        type: String,
    },
    sets: {
        type: String,
    }
});

module.exports = workoutSchema;