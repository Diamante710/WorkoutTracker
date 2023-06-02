const {Schema, model} = require (`mongoose`)
const bcrypt = require ('bcrypt')
const workoutSchema = require ('./Workout')
const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'not an email address']
    },

    password: {
        type: String,
        required: true,

    },
    userworkout: [
        workoutSchema
    ]
}, {
   toJSON: {
    virtuals: true
   } 
})
UserSchema.virtual('workoutFrequency').get(
    function(){
        return this.userworkout.length
    }
)
UserSchema.pre('save', async function (
    next
){
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})  
UserSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
const User = model('User', UserSchema);
module.exports = User;