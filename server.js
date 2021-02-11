//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//initialize Express app
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//connecting to MongoDB
mongoose.connect('mongodb://admin:admin1234@cluster0-shard-00-00.cf468.mongodb.net:27017,cluster0-shard-00-01.cf468.mongodb.net:27017,cluster0-shard-00-02.cf468.mongodb.net:27017/screenrant-db?ssl=true&replicaSet=atlas-vk72pn-shard-0&authSource=admin&retryWrites=true&w=majority');

// mongoose.connect('mongodb://localhost/screenrant', {
//   useMongoClient: true
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongoose!')
});

var routes = require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
