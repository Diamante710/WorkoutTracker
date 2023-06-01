const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedWorkouts: [Workout]
}

type Workout {
    _Id
    name: String!
    reps: String!
    goal reps: String!
    weight: String!
    goal weight: String!
    sets: String!
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
