/**
 * Import environmental variables
 */
require('dotenv').config()

/**
 * Necessary imports for starting a server
 */
const db = require('./config/mongodb')
const express = require('express')
const cors = require('cors')
const app = express()                      

/**
 * Import routers and middleware
 */
const morgan = require('morgan')
const loginRouter = require('./routers/login')
const personRouter = require('./routers/people')
const quizRouter = require('./routers/quiz')
const questionRouter = require('./routers/question')


/**
 * Initial server setup
 * We need to use cors so we can receive requests from localhost
 * We need express.json so we can receive requests with JSON data
 */
app.use(cors())
app.use(express.json())

/**
 * Adding middleware and routes
 */
app.use(morgan('dev'))
app.use('/api/login', loginRouter)
app.use('/api/people', personRouter)
app.use('/api/quizes', quizRouter)
app.use('/api/question', questionRouter)

/**
 * Connect to database, start server & listen to server
 */
const server = async () => {
    await db.makeConnection()
    return app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`)
  })
  }
  
// Start the server if not in a testing environment
if (process.env.NODE_ENV !== 'test') {
  server();
}


module.exports = app; 