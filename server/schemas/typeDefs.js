const {gql} = require ('apollo-server-express')
const typeDefs = gql`
type User{
    _id: ID!
    email: String!
    password: String!
    userworkout: [Workout]
    workoutFrequency: Number
}

type Workout {
    _id: ID!
    weight: Number!
    goalweight: Number!
    reps: Number!
    goalreps: Number!
    
}
`

module.exports = typeDefs;