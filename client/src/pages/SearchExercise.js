import React, {  useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";
import { SAVE_EXERCISE } from "../utils/mutations";
// import { css } from '@emotion/react';
import { QUERY_EXERCISES } from "../utils/queries";
import { getSavedExerciseIds, saveExerciseIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

const SearchExercises = () => {
  // create state for holding returned google api data
  const [searchedExercises, setSearchedExercises] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  
  // create state to hold saved exerciseId values
  const [savedExerciseIds, setSavedExerciseIds] = useState(getSavedExerciseIds());

  const [saveExercise, { error }] = useMutation(SAVE_EXERCISE);
  const [getExercises, {loading, data}] = useLazyQuery(QUERY_EXERCISES,
    {
      variables: {searchInput: searchInput}
    });  
  
    useEffect(() => {
      if (searchInput){
       getExercises()
      }
     }, [searchInput]
     )

  useEffect(() => {
    return () => saveExerciseIds(savedExerciseIds);
  });
  
  // create method to search for exercises and set state on form submit
  const HandleFormSubmit = async (event) => {
    event.preventDefault();


    console.log(searchInput)
    if (!searchInput) {
      return false;
    }
    
    if (!loading) {
      // throw new Error('something went wrong!');
      try {
  console.dir(data)
          const { items } = await data.json();
          
          const exerciseData = items.map((exercise) => ({
            exerciseId: exercise.id,
            name: exercise.name,
            description: exercise.description,
            image: exercise.imageLinks?.thumbnail || '',
          }));
          console.log(data);
          setSearchedExercises(exerciseData);
          setSearchInput('');
        } catch (err) {
          console.error(err);
        }
    }
    };
    
    // create function to handle saving a exercise to our database
    const handleSaveExercise = async (exerciseId) => {
      // find the exercise in `searchedexercises` state by the matching id
      const exerciseToSave = searchedExercises.find((exercise) => exercise.exerciseId === exerciseId);
      
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      
      if (!token) {
      return false;
    }

    try {
      const { data } = await saveExercise({variables: { exerciseData: { ...exerciseToSave }}});
      console.log(savedExerciseIds);
      setSavedExerciseIds([...savedExerciseIds, exerciseToSave.exerciseId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
  <div className="text-light bg-dark p-5">
        <Container>
          <h1>The Path to Swole City!</h1>
          <Form onSubmit={HandleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search by Muscle'
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedExercises.length
            ? `Viewing ${searchedExercises.length} results:`
            : 'Exercise Search Results:'}
        </h2>
        <Row>
        {loading ? <div>loading...</div> :
        data && data.exerciseList.map((exercise) => {
            return (
              <Col md="4">
                <Card key={exercise.exerciseId} border='dark'>
                  {/* {exercise.image ? (
                    <Card.Img src={exercise.image} alt={`The cover for ${exercise.name}`} variant='top' />
                  ) : null} */}
                  <Card.Body>
                    <Card.Title>{exercise.name}</Card.Title>
                    <Card.Text>Difficulty: {exercise.difficulty}</Card.Text>
                    <Card.Text>Instructions: {exercise.instructions}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveExercise(exercise.exerciseId)}>
                        {savedExerciseIds?.some((savedExerciseId) => savedExerciseId === exercise.exerciseId)
                          ? 'This exercise has already been saved!'
                          : 'Save this Exercise!'}
                      </Button>
                    )}
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

export default SearchExercises;
