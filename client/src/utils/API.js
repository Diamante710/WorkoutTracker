export const getMe = token => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    });
};

export const createUser = userData => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};

export const loginUser = userData => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
};

export const saveWorkout = (workoutData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(workoutData)
    });
};

export const deleteWorkout = (workoutId, token) => {
    return fetch(`/api/users/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};

// export const searchWorkouts = (query) => {
//     return fetch 