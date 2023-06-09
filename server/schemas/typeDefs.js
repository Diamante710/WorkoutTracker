const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedWorkouts: [Workout]
  workoutFrequency: Int
}

type Workout {
  _id: ID!
  name: String!
  reps: Int!
  goalReps: Int!
  weight: Float!
  goalWeight: Float!
  sets: Int!
}

input WorkoutData {
  name: String!
  reps: Int!
  goalReps: Int!
  weight: Float!
  goalWeight: Float!
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
    removeWorkout(workoutId: ID!): User
  }
`;

module.exports = typeDefs;