import React, { useState } from 'react';

const UserHomepage = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState('');
  const [repsAchieved, setRepsAchieved] = useState('');
  const [goalReps, setGoalReps] = useState('');
  const [weightAchieved, setWeightAchieved] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

  const handleAddExercise = (e) => {
    e.preventDefault();
    const newExercise = {
      name,
      repsAchieved,
      goalReps,
      weightAchieved,
      goalWeight,
    };
    setExercises([...exercises, newExercise]);
    setName('');
    setRepsAchieved('');
    setGoalReps('');
    setWeightAchieved('');
    setGoalWeight('');
  };

  const handleEditExercise = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  return (
    <div>
      <h2>Welcome to the User Homepage</h2>
      <div>
        <h3>Add New Exercise</h3>
        <form onSubmit={handleAddExercise}>
          <div>
            <label>Exercise Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Reps Achieved:</label>
            <input
              type="number"
              value={repsAchieved}
              onChange={(e) => setRepsAchieved(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Goal Reps:</label>
            <input
              type="number"
              value={goalReps}
              onChange={(e) => setGoalReps(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Weight Achieved:</label>
            <input
              type="number"
              value={weightAchieved}
              onChange={(e) => setWeightAchieved(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Goal Weight:</label>
            <input
              type="number"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Add Exercise</button>
          </div>
        </form>
      </div>
      <div>
        <h3>Exercise List</h3>
        <table>
          <thead>
            <ol>
              <li>Name</li>
              <li>Reps Achieved</li>
              <li>Goal Reps</li>
              <li>Weight Achieved</li>
              <li>Goal Weight</li>
            </ol>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) =>
                      handleEditExercise(index, 'name', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={exercise.repsAchieved}
                    onChange={(e) =>
                      handleEditExercise(index, 'repsAchieved', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={exercise.goalReps}
                    onChange={(e) =>
                      handleEditExercise(index, 'goalReps', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={exercise.weightAchieved}
                    onChange={(e) =>
                      handleEditExercise(index, 'weightAchieved', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={exercise.goalWeight}
                    onChange={(e) =>
                      handleEditExercise(index, 'goalWeight', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHomepage;