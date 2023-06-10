const { User, Exercise } = require('../models');
const { AuthenthicationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return userData = await User.findOne({ _id: context.user._id }).populate('savedExercises')
            }
            throw new AuthenthicationError("Not logged in");
        },

        exerciseList: async ( parent, {searchInput} ) => {
        const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${searchInput}`;
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': "44e6a5e212msh978d8c1cde4ffcdp15b253jsn61631e3430de",
              'X-RapidAPI-Host': "exercises-by-api-ninjas.p.rapidapi.com"
              }
            };
      
            try {
              const response = await fetch(url, options);
              const result = await response.json();
              console.log(result)
              return result; // Assuming the response is JSON
            } catch (error) {
              console.error(error);
              throw new Error('Failed to fetch exercises');
            }
          },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
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

        addExercise: async (parent, args) => {
                const exercise = await Exercise.create(args);
                return { exercise };
        },

        editExercise: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedExercises: args }},
                    { new: true }
                );
                return updatedUser;
            };
        },

        saveExercise: async (parent, { exerciseData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedExercises: exerciseData }},
                    { new: true }
                );
                return updatedUser;
            };
        },
        
        removeExercise: async (parent, {exerciseId}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedExercises: { exerciseId } }},
                    { new: true }
                );
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;
