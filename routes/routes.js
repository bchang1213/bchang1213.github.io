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

// Queries HAD API for project data
router.get('/home', function (req, res) {
    res.render('home', {
    });
});


module.exports = router;