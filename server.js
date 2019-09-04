var express = require("express");
var http = require("http");
const app = express();
const server = http.createServer(app);
const port = 8000;
var bodyParser = require('body-parser');
var session = require('express-session');


//Enable Session Authentication
app.use(session({
    secret: 'SuperSecratCodeChangeMeLatr',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
    if(req.session && req.session.user === 'amy' && req.session.admin){
        return next();
    }
    else{
        return res.sendStatus(401);
    }

};

//enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 

// set the view engine to ejs
app.set('view engine', 'ejs');

//serve static files
app.use(express.static('public'))

//Routes
app.use(require('./server/routes/routes.js')); 
//redirect any strange urls to the root route
app.all('*', function (req, res) {
    res.redirect('/');
});

//run the server on port 8000
server.listen(process.env.PORT || port);
server.on('error', onError);
// server.on('listening', onListening);
console.log('Listening on port: ', port);

/*
 * Event Listener for HTTP Server 'error' event
 *
*/
 function onError(error) {
     if(error.syscall !== 'listen') {
        throw error;
     }

     const bind = typeof port ===  'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

     // handle specific listen errors with friendly messages
     switch (error.code) {
        case 'EACCES':
             console.error(bind + ' requires elevated privileges.');
             process.exit(1);
             break;
        default:
             throw error;
     }
 }

/**
 * Event listener for HTTP server 'listening' event
 *
 * */

// function onListening() {
//     const addr = server.address();
//     const bind = typeof addr === 'string'
//         ? 'pipe' + addr
//         : 'port' + addr.port;
//     debug('Listening on ' + bind);

// }
