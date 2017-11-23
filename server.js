/**
 * Created by opaluwa john on 11/22/2017.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');

var port = 3000;

var app = express();

//load enviroment variables from .env file where API Keys and passwords are configured
//dotenv.load({path: '.env.example'});

//View Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/', index);

/* Send all other requests to angular app */
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html' ))
})

//app.use('/api', tasks);

app.listen(port, function(){
  console.log('Server started on port '+port);
});
