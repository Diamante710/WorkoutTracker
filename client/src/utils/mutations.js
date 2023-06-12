import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token 
      user {
      _id
      username
      email
      }
    }
  }
`;

export const SAVE_EXERCISE = gql`
  mutation saveExercise($exerciseData: ExerciseInput!) {
    saveExercise(exerciseData: $exerciseData) {
      _id
      username
      email
      password
      savedExercises {
        exerciseId
        name
        reps
        goalReps
        weight
        goalWeight
        sets
      }
    }
    }`
  ;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      _id
      username
      email
      password
      savedExercises {
        exerciseId
        name
        reps
        goalReps
        weight
        goalWeight
        sets
      }
    }
  }`
  ;

export const ADD_EXERCISE = gql`
  mutation addExercise($exerciseId: ID!) {
    addExercise(exerciseId: $exerciseId) {
      _id
      username
      email
      password
      savedExercises {
        exerciseId
        name
        reps
        goalReps
        weight
        goalWeight
        sets
      }
    }
  }`
  ;

  export const EDIT_EXERCISE = gql`
  mutation editExercise($exerciseId: ID!) {
    editExercise(exerciseId: $exerciseId) {
      _id
      username
      email
      password
      savedExercises {
        exerciseId
        name
        reps
        goalReps
        weight
        goalWeight
        sets
      }
    }
  }`
  ;
