var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require("mongojs");
var db = mongo('oora-wheels', ["users"]);
var expressValidator = require("express-validator");

var app = express();

app.use(cors());

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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
    console.log(req.body);
     res.json({
         message : "success"
     });
});

app.post('/register', function (req, res) {
    console.log(req.body);
     res.json({
         message : "registered"
     });
});

app.listen(3034, function(){
    console.log('Server listening on port 3034');
})