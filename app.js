var express = require('express');
var bodyParser = require('body-parser');
var logger = require('logger');
var path = require('path');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.set(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log("Server Started on port 3000!!");
});
