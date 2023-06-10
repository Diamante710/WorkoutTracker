import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Query {
    me {
      _id
      email
      username
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
}
`;


export const QUERY_EXERCISES = gql`
query Query($searchInput: String) {
    exerciseList(searchInput: $searchInput) {
      name
      type
      muscle
      difficulty
      equipment
      instructions
    }
  }
`;
