const { User } = require('../models');
const { Workout } = require('../models/Workout');
const { AuthenthicationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return userData = await User.findOne({ _id: context.user._id }).populate('savedWorkouts')
            }
            throw new AuthenthicationError("Not logged in");
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            // console.log(args)
            try {
                const user = await User.create(args);
                const token = signToken(user);
                console.log(token, user)
                return { token, user };
            }
            catch (err) {
                console.log(err)
            }
            // const user = await User.create(args);
            // const token = signToken(user);
            // console.log(token, user)
            // return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (user) {
                const correctPassword = await user.isCorrectPassword(password);

                if (correctPassword) {
                    const token = signToken(user);
                    return { token, user };
                }
            }
        },

        addWorkout: async (parent, args, context) => {
            if (context.user) {
                const workout = await Workout.create(args);
                return { workout };
            };
        },

        editWorkout: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedWorkouts: args }},
                    { new: true }
                );
                return updatedUser;
            };
        },

        saveWorkout: async (parent, { workoutData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedWorkouts: workoutData }},
                    { new: true }
                );
                return updatedUser;
            };
        },
        
        removeWorkout: async (parent, workoutid, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedWorkouts: { workoutid } }},
                    { new: true }
                );
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;
