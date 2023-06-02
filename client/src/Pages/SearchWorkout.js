import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { SAVE_WORKOUT } from "../utils/mutations";
import { css } from '@emotion/react';
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
       <div
        css={css`
        `}
      >
        <div
          css={css`
          `}
        >
          <h1>Search for Workouts!</h1>
          <form onSubmit={handleFormSubmit}>
            <div
              css={css`
              `}
            >
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                css={css`
                `}
                placeholder="Search for a Workout"
              />
              <button
                type="submit"
                css={css`
                  cursor: pointer;
                `}
              >
                Submit Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        css={css`
        `}
      >
        <h2>
          {searchedWorkouts.length
            ? `Viewing ${searchedWorkouts.length} results:`
            : 'Search for a Workout to begin'}
        </h2>
        <div
          css={css`
          `}
        >
          {searchedWorkouts.map((Workout) => {
            return (
              <div
                key={Workout.WorkoutId}
                css={css`
                `}
              >
                <div
                  css={css`
                  `}
                >
                  {Workout.image ? (
                    <img
                      src={Workout.image}
                      alt={`The cover for ${Workout.title}`}
                      css={css`
                      `}
                    />
                  ) : null}
                  <h3>{Workout.title}</h3>
                  <p
                    css={css`
                    `}
                  >
                    Authors: {Workout.authors}
                  </p>
                  <p>{Workout.description}</p>
                  {Auth.loggedIn() && (
                    <button
                      disabled={workoutIds?.some((workoutId) => workoutId === Workout.WorkoutId)}
                      css={css`
                        cursor: pointer;
                      `}
                      onClick={() => handleSaveWorkout(Workout.WorkoutId)}
                    >
                      {workoutIds?.some((workoutId) => workoutId === Workout.WorkoutId)
                        ? 'This Workout has already been saved!'
                        : 'Save this Workout!'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchWorkouts;
