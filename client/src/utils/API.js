const url = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${query}';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ht7xFqiZDRLSRN/SdsB9qw==nnDAeZ8CPMRhW4Cg',
    'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
  }
};

fetch(url, options)
  .then(response => response.text())
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
});




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

