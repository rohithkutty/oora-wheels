const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./server/routes/api/users');

const app = express();

// DB config
const db = require('./server/config/keys').mongoURI;

//Cors access
app.use(cors());

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./server/config/passport')(passport);

// Sample route
app.get('/hello', (req, res) => {
  res.send('Hello');
});

// Use routes
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server listening on port ${PORT}`));
