import React from "react";
import { REMOVE_EXERCISE } from "../utils/mutations";
import { removeExerciseId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from '../utils/auth';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

const SavedExercises = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeExercise, { error }] = useMutation(REMOVE_EXERCISE);

  const handleRemoveExercise = async (exerciseId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeExercise({
        varibles: { exerciseId },
      });
      // const updatedUser = await data.json();
      // setData(updatedUser);
      // upon success, remove item from localStorage
      localStorage.removeItem('exerciseId');
      removeExerciseId(exerciseId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
  <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved exercises!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data?.me.savedExercise.length
            ? `Viewing ${data?.me.savedExercise.length} saved ${data?.me.savedExercise.length === 1 ? 'exercise' : 'exercise'}:`
            : 'You have no saved exercises!'}
        </h2>

        <Row>
          {data?.me.savedExercise.map((exercise) => {
            return (
              <Col md="4">
                <Card key={exercise.exerciseId} border='dark'>
                  {exercise.image ? <Card.Img src={exercise.image} alt={`The cover for ${exercise.name}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{exercise.name}</Card.Title>
                    <Card.Text>{exercise.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleRemoveExercise(exercise.exerciseId)}>
                      Remove this Exercise!
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

  export default SavedExercises;
