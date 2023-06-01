import React, { useEffect, useState } from 'react';
import { REMOVE_WORKOUT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { removeWorkoutId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";
import Auth from '../utils/auth';

const SavedWorkouts = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeWorkout, { error }] = useMutation(REMOVE_WORKOUT);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleRemoveWorkout = async (bookId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeWorkout({
        variables: { workoutId },
      });

      removeWorkoutId(workoutId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {data?.me.username}'s saved Workouts!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data?.me.savedWorkouts.length
            ? `Viewing ${data?.me.savedWorkouts.length} saved ${data?.me.savedWorkouts.length === 1 ? 'book' : 'Workouts'}:`
            : 'You have no saved Workouts!'}
        </h2>
        <Row>
          {data?.me.savedWorkouts.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  <Card.Body>
                    <Card.Title>{workout.name}</Card.Title>
                    <Card.Text>{workout.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleRemoveWorkout(book.bookId)}>
                      Delete this Workout!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedWorkouts;
