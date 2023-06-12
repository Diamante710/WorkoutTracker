const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  exerciseFrequency: Int
  savedExercises: [Exercise]
}

type Exercise {
    exerciseId: ID!
    name: String
    reps: Int
    goalReps: Int
    weight: Float
    goalWeight: Float
    sets: Int
}

type ExerciseList {
  name: String!
  type: String!
  muscle: String!
  equipment: String!
  difficulty: String!
  instructions: String!
}

type Auth {
    token: ID!
    user: User
  }

input ExerciseData {
  name: String
  reps: String
  goalReps: String
  weight: String
  goalWeight: String
  sets: String
}

type Query {
   me: User
   exerciseList(searchInput: String): [ExerciseList]
  }

type Mutation {
    addUser (username: String! email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExercise(exerciseData: ExerciseData!): User
    editExercise(exerciseData: ExerciseData!): User
    saveExercise(exerciseData: ExerciseData!): User
    removeExercise(exerciseId: ID!): User
}
`;

module.exports = typeDefs;