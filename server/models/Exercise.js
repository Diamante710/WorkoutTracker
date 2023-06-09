const {Schema} = require('mongoose')

const exerciseSchema = new Schema ({
    exerciseId: {
        type: String,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
        default: 0
    },
    goalReps: {
        type: Number,
        required: true,
        default: 0
    },
    weight: {
        type: Number,
        required: true,
        default: 0,
    },
    goalWeight: {
        type: Number,
        required: true,
        default: 0,
    },
    sets: {
        type: Number,
        required: true,
        default: 0,
    },
},{
    timestamps: true
})

module.exports = exerciseSchema;