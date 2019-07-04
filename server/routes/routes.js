var express = require("express");
const router = express.Router();
var request = require('request');


/************************************************************
*                       Helper Functions                    *
************************************************************/

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    var theDate = Date(Date.now());
    var dateString = theDate.toString();
  console.log('Time: ', dateString);
  next();
});

/************************************************************
*                       Router Functions                    *
************************************************************/

// Define the home page route
router.get('/', function(req, res) {
    res.render('landing',{

    });
});

// Home Page after Login
router.get('/home', function (req, res) {
    res.render('home', {
    });
});

// Store page
router.get('/store', function (req, res) {
    res.render('store', {
    });
});

module.exports = router;