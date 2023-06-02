import { useState, useEffect } from "react";
import {css} from '@emotion/react';
import {Auth} from '../utils/auth'
import styled from '@emotion/styled'


const Color = 'blue'

render(
    <div
      css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${Color};
        }
      `}
    >
      Hover to change color.
    </div>
)



const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

render(<Button>This my button component.</Button>)

const savedWorkout = () => {
    const [userdata, setUserdata] = useState({})

    const userdatalegnth = Object.keys(userdata).length;
    useEffect(() => {
        const getUserData = async () => {
          try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;
    
            if (!token) {
              return false;
            }
    
            const response = await getMe(token);
    
            if (!response.ok) {
              throw new Error('something went wrong!');
            }
    
            const user = await response.json();
            setUserData(user);
          } catch (err) {
            console.error(err);
          }
        };
    
        getUserData();
      }, [userDataLength]);





    const handleDeleteWorkout = async (workoutId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        null;

        if (!token) {
            return false;
        }

        try {
            const response = await deleteWorkout(workoutId, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const updatedUser = await response.json();
            setUserData(updatedUser);
            // upon success, remove item from localStorage
            localStorage.removeItem('workoutId');
            removeWorkoutId();
        } catch (err) {
            console.error(err);
        }
    };

    if (!userDataLength) {
        return <h2>LOADING...</h2>;
    }

    const Section = styled.section`
        background-color: #efefef;
        padding: 10px 0;
        margin: 0 auto;
        max-width: 960px;
    `;

    const Row = styled.row`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 5px;
    `;

    return (
        render(
        <div className="flex-row justify-center mb-3">
            <Section>
            <h1>Viewing {userData.username}'s workout!</h1>
            </Section>
        </div>
        ),
        <h2 className="flex-row justify-center mb-3">
            {userData.savedWorkouts.length
            ? `Viewing ${userData.savedWorkouts.length} saved ${userData.savedWorkouts.length === 1 ? 'workout' : 'workouts'}:`
            : 'You have no saved workouts!'}
        </h2>
        ),
        <Row>
            {userData.savedWorkouts.map((workout) => {
                return (
                    <Card key={workout._id} border='dark'>
                        <Card.Header>
                            <h3>{workout.name}</h3>
                            <div>
                                {workout.exercises.map((exercise) => {
                                    return (
                                        <p key={exercise._id} className="card-body">
                                            {exercise.name} <br />
                                            {exercise.sets} <br />
                                            {exercise.reps} <br />
                                            {exercise.weight} <br />
                                            {exercise.duration} <br />
                                            {exercise.distance} <br />
                                        </p>
                                    );
                                })}
                            </div>
                            <Button
                                className="btn-block btn-danger"
                                onClick={() => handleDeleteWorkout(workout._id)}
                            >
                                Delete this Workout!
                            </Button>
                        </Card.Header>
                    </Card>
                );
            })}
        </Row>
};

export default savedWorkout;