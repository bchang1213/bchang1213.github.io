import express from 'express';
import http from 'http';
import apiData from './apiData';
const app = express();
const server = http.createServer(app);
const port = 8000;

console.log("Server.js was started up...")
console.log("apiData is as follows: " + JSON.stringify(apiData, null, 2));

//If the apiData object does not contain the essential user information from Hackaday:
if (!apiData.userKey || !apiData.clientId || !apiData.clientSecret) {
    console.log('Please fill in your client data!  See line 10 in server.js.');
    console.log('Ending node process.');
    process.exit();
}

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

