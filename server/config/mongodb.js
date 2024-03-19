// Handling getting our evn
const path = require('path')
require('dotenv').config({path: path.join(__dirname,'../.env')})

// Imports and setup for connections
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const helpers = require('../utils/helpers')

//make and close functions
const makeConnection = async () => {
    const databaseURL = helpers.getURL()
    try {
      console.log(`connecting to... ${databaseURL}`)
      await mongoose
        .connect(databaseURL)
      console.log('successful connection to MongoDB')
    } catch (error) {
      console.log('error connecting to MongoDB: ', error)
    }
  }
  
  const closeConnection = async () => {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.log('error closing connection: ', error)
    }
  }

  module.exports = { makeConnection, closeConnection }
