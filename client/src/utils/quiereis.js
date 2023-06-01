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
        goal reps
        weight
        goal weight
        sets
      
    }
  }
`;

