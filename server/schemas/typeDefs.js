const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  email: String!
  password: String!
  savedWorkouts: [Workout]
  workoutFrequency: Number
}

type Workout {
    _Id: ID!
    name: String!
    reps: Number!
    goal reps: Number!
    weight: Number!
    goal weight: Number!
    sets: Number!
}

type Auth {
    token: ID!
    user: User
  }

type Query {
   me: User
  }

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkout(workoutData: WorkoutData!): User
    editWorkout(workoutData: WorkoutData!): User
    saveWorkout(workoutData: WorkoutData!): User
    deleteWorkout(workoutId: ID!): User
`;

module.exports = typeDefs;