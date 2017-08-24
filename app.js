var express = require('express');
var bodyParser = require('body-parser');
var logger = require('logger');
var path = require('path');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var mongoose = require('mongoose');

var webpackConfig = require('./webpack.config');
var index = require('./routers/index');
var signup = require('./routers/signup');
var config = require('./config/main');

mongoose.connect(config.database);
mongoose.Promise = global.Promise;

var app = express();

var compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(webpackHot(compiler));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', signup);
app.use('/*', index);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
	console.log("Server Started on port 3000!!");
});
