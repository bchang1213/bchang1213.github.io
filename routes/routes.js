import express from 'express';
const router = express.Router();
import apiData from '../apiData';
import request from 'request';


/************************************************************
*                       Helper Functions                    *
************************************************************/
function parseJSON (value) {
    var parsed;
    try {
        parsed = JSON.parse(value);
    } catch (e) {
        console.log('Error parsing JSON: ', e, '\nInput: ', value);
    }
    return parsed || false;
}

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
    res.render('home',{

    });
});

// Queries HAD API for project data
router.get('/projects', function (req, res) {
    //set current page if specifed as get variable (eg: /?page=2)
    var currentPage = 1;
	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
    }
    var url = apiData.apiUrl + '/projects' + apiData.apiKey + '&page='+ currentPage +'&per_page=2';
    console.log('\nProject Data Query: ', url);
    
    res.render('index', {
        currentPage: +req.query.page
    });
});

// renders individual project page
router.get('/projects/:id', function (req, res) {
    var url = apiData.apiUrl + '/projects/'+ +req.params.id + apiData.apiKey;
    console.log('\nProject Data Query: ', url);
    //perform AJAX request to Hackaday API
    request.get(url, function (error, response, body) {
        var bodyData = parseJSON(body);
        // console.log("Data retrieved: " + JSON.stringify(bodyData, null, 2));
        res.render('projectPage', {
            project: bodyData
        });
    });
});

// Queries HAD API for recommended projects based
router.get('/getRecommendedProjects', function (req, res) {
    var url = apiData.apiUrl + '/projects/search?search_term=' + req.query.tag + '&api_key=q7QPx8lB981WAcUr';
    console.log('\nProject Data Query: ', url);
    
    //perform AJAX request to Hackaday API
    request.get(url, function (error, response, body) {
        var bodyData = parseJSON(body);
        console.log("Data retrieved: " + JSON.stringify(bodyData, null, 2));
        res.json(bodyData);
    });
});

// Queries HAD API for project data
router.get('/getProjects', function (req, res) {
    //set current page if specifed as get variable (eg: /?page=2)
    var currentPage = 1;
	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
    }
    var url = apiData.apiUrl + '/projects' + apiData.apiKey + '&page='+ currentPage +'&per_page=2';
    console.log('\nProject Data Query: ', url);
    
    //perform AJAX request to Hackaday API
    request.get(url, function (error, response, body) {
        var bodyData = parseJSON(body);
        // console.log("Data retrieved: " + JSON.stringify(bodyData, null, 2));
        res.json(bodyData);
    });
});

// Queries HAD API for User ID
router.get('/getUser', function (req, res) {
    var url = apiData.apiUrl + '/users/' + req.query.userID + apiData.apiKey;
    console.log('\nProject Data Query: ', url);
    
    //perform AJAX request to Hackaday API
    request.get(url, function (error, response, body) {
        var bodyData = parseJSON(body);
        // console.log("Data retrieved: " + JSON.stringify(bodyData, null, 2));
        res.json(bodyData);
    });
});

// HAD API oAuth
router.get('/authorize', function (req, res) {
    res.redirect(apiData.oAuthRedirect);
});

// HAD API Callback
router.get('/callback', function (req, res) {
    var code = req.query.code;
    if (!code) {
        return res.redirect('/');
    }

    console.log('\nAccess code: ', code);

    var postUrl = apiData.createTokenUrl(code);

    console.log('\nPost Url: ', postUrl);

    request.post(postUrl, function (err, res2, body) {

        var parsedData = parseJSON(body),
            token = null;

        if (parsedData) {
            token = parsedData.access_token;
        }

        if (!token) {
            console.log('\nError parsing access_token: ', body);
            return res.redirect('/');
        }

        console.log('\nToken: ', token);

        // Add token to header for oAuth queries
        var options = {
            url: apiData.apiAuthUrl,
            headers: {Authorization: 'token ' + token}
        };

        request.get(options, function (err, res3, body) {
            var bodyData = parseJSON(body);
            if (!bodyData) {
                console.log('\nError parsing bodyData');
                return res.redirect('/');
            }
            console.log('\noAuth successful!');
            res.render('index', {
                dataType: 'oAuth Data',
                token: token,
                apiData: bodyData
            });
        });

    });
});


module.exports = router;