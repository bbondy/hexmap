'use strict';

var express = require('express'),
  async = require('async'),
  stylus = require('stylus'),
  Promise = require('promise');

var PORT = 8089;

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false, pretty: true });
app.use(stylus.middleware({
          src: __dirname + '/public',
          compress: true
       })).
  use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  res.render('layout', { });
});

app.use(function(req,res){
  res.render('notFound');
});

// Determine the environment like this: NODE_ENV=production node app.js
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
  process.on('uncaughtException', function (exception) {
    console.error(exception);
  });
});

app.listen(PORT, function() {
  console.log('Starting server on port %d in %s mode', PORT, app.settings.env);
});

