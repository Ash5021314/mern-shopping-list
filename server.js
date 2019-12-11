const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const client = require('mongodb').MongoClient


const items = require('./routes/api/items')
const app = express()

// BodyParser Middleware

app.use(bodyParser.json())

//DB Config

const db = require('./config/keys').mongoURI
// const db = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test'


//connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log('mongodb connected...')
  })
  .catch((err => console.log(err)))

app.use('/api/items', items)
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))