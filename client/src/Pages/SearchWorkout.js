import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../utils/mutations";
import { getWorkoutIds, saveWorkoutIds } from '../utils/localStorage';
import Auth from '../utils/auth';


const SearchWorkouts = () => {
  // create state for holding returned google api data
  const [searchedWorkouts, setSearchedWorkouts] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  
  // create state to hold saved WorkoutId values
  const [workoutIds, setWorkoutIds] = useState(getWorkoutIds());
  
  const [saveWorkout, { error }] = useMutation(SAVE_WORKOUT);
  
  useEffect(() => {
    return () => saveWorkoutIds(workoutIds);
  });
  
  // create method to search for Workouts and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!searchInput) {
      return false;
    }
    
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${searchInput}`
        );
        
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
        
        const { items } = await response.json();
        
        const workoutData = items.map((workout) => ({
          WorkoutId: workout.id,
          name: workout.volumeInfo.title,
          description: workout.volumeInfo.description,
        }));
        
        setSearchedWorkouts(workoutData);
        setSearchInput('');
      } catch (err) {
        console.error(err);
      }
    };
    
    // create function to handle saving a Workout to our database
    const handleSaveWorkout = async (workoutId) => {
      // find the Workout in `searchedWorkouts` state by the matching id
      const workoutToSave = searchedWorkouts.find((workout) => workout.workoutId === workoutId);
      
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      
      if (!token) {
      return false;
    }

    try {
      console.log("wrong")
      const { data } = await saveWorkout({variables: { workoutData: { ...workoutToSave }}});
      console.log(workoutIds);
      // if Workout successfully saves to user's account, save Workout id to state
      setWorkoutIds([...workoutIds, workoutToSave.workoutId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Workouts!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Workout'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedWorkouts.length
            ? `Viewing ${searchedWorkouts.length} results:`
            : 'Search for a Workout to begin'}
        </h2>
        <Row>
          {searchedWorkouts.map((Workout) => {
            return (
              <Col md="4">
                <Card key={Workout.WorkoutId} border='dark'>
                  {Workout.image ? (
                    <Card.Img src={Workout.image} alt={`The cover for ${Workout.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{Workout.title}</Card.Title>
                    <p className='small'>Authors: {Workout.authors}</p>
                    <Card.Text>{Workout.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={WorkoutIds?.some((WorkoutId) => WorkoutId === Workout.WorkoutId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveWorkout(Workout.WorkoutId)}>
                        {WorkoutIds?.some((WorkoutId) => WorkoutId === Workout.WorkoutId)
                          ? 'This Workout has already been saved!'
                          : 'Save this Workout!'}
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

export default SearchWorkouts;
