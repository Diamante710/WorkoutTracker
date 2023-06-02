import { gql } from '@apollo/client';

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
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
      _id
      username
      email
      }
    }
  }
`;
export const SAVE_WORKOUT = gql`
  mutation saveWorkout($workoutData: WorkoutInput!) {
    saveWorkout(workoutData: $workoutData) {
      _id
      username
      email
      savedWorkouts {
        workoutId
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

export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
      _id
      username
      email
      savedWorkouts {
        workoutId
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

export const ADD_WORKOUT = gql`
  mutation addWorkout($workoutId: ID!) {
    addWorkout(workoutId: $workoutId) {
      _id
      username
      email
      savedWorkouts {
        workoutId
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

  export const EDIT_WORKOUT = gql`
  mutation editWorkout($workoutId: ID!) {
    editWorkout(workoutId: $workoutId) {
      _id
      username
      email
      savedWorkouts {
        workoutId
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
