var express = require("express");
var http = require("http");
const app = express();
const server = http.createServer(app);
const port = 8000;

// Sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 

// set the view engine to ejs
app.set('view engine', 'ejs');

//serve static files
app.use(express.static('public'))

//Routes
app.use(require('./routes/routes.js')); 
//redirect any strange urls to the root route
app.all('*', function (req, res) {
    res.redirect('/');
});

//run the server on port 8000
server.listen(port);
console.log('Listening on port: ', port);

