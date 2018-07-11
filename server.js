var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/login', function (req, res) {
    console.log(req.body);
     res.json({
         message : "success"
     });
});

app.listen(3034, function(){
    console.log('Server listening on port 3034');
})