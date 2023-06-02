const {Schema} = require('mongoose')
const workoutSchema = new Schema ({
    name: {
        type: String,
        required: true,

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
    

},{
    timestamps: true
})

module.exports = workoutSchema;