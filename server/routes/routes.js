var express = require("express");
const router = express.Router();
var request = require('request'); 
const controller = require('../controllers/controller.js');
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
*              Navigation Router Requests                   *
************************************************************/

// Default page route
router.get('/', function(req, res) {
    res.render('landing',{

    });
});

// User Login Route PAYWALL
router.get('/login', function (req, res) {
    res.render('login', {
    });
});

// Home Page after Login for Online Training
router.get('/home', function (req, res) {
    res.render('home', {
    });
});

// Affiliates Info
router.get('/team', function (req, res) {
    res.render('affiliates', {
    });
});

// Blog
router.get('/blog', function (req, res) {
    res.render('blog', {
    });
});

// Contact
router.get('/hello', function (req, res) {
    res.render('contactus', {
    });
});

// Store page
router.get('/store', function (req, res) {
    console.log("serving store page");
    controller.productController.renderStore(req, res);
});

// Product page
router.get('/product/:productID', function (req, res) {
    console.log("serving product page");
    controller.productController.renderProduct(req, res);
});

/************************************************************
*                       API Requests                        *
************************************************************/
//Contact Info Post Route
router.post('/contact', function(request, response) {
    console.log("serving contact route.");
    controller.contactformController.createContactForm(request, response);
    response.redirect('/');
})
//Get All Products
router.get('/products', function(request, response){
    console.log("serving list of all products.");
    controller.productController.ListProducts(request, response);
})

//Submit A Product
router.post('/createProduct', function(request, response) {
    console.log("Posting a single product.");
    controller.productController.createProduct(request, response);
    response.send("Product saved.");
})

//Delete Request of Contact Forms
router.post('/delete', function(request, response){
    console.log("serving delete route.");
    controller.contactformController.deleteContactForm(request, response);
    response.redirect('/management');
})

module.exports = router;
