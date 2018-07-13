var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require("mongojs");
var db = mongo('oora-wheels', ["users"]);
var expressValidator = require("express-validator");

var PORT = process.env.PORT || 3034;
var app = express();

app.use(cors());

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express validator middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.post('/login', function (req, res) {

});

app.post('/register', function (req, res) {
  req.checkBody("firstname", "First name id is Required").notEmpty();
  req.checkBody("lastname", "Last name is Required").notEmpty();
  req.checkBody("email", "Email is Required").notEmpty();
  req.checkBody("gender", "Gender is Required").notEmpty();
  req.checkBody("password", "Password is Required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    db.users.find(function (err, docs) {
      res.json({
        users: docs
      });
    });
  } else {
    var newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      gender: req.body.gender,
      password: req.body.password
    };

    console.log(newUser);
    
    db.users.insert(newUser, function (err, result) {
      console.log('value inserted');
      
      if (err) {
        console.log(err);
      }
      res.json({
        message: "registered"
      });
    });
  }
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
})