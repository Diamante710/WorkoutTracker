import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      password
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
}
`;

