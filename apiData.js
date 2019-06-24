var clientId ='krRmZ8sifnCJwK7HZ8xG2pO26IIIAfUAWGzopX4B5wkSr5tV';
var clientSecret = '8HOQbYxYRaBcStEZYTqk0NrfrurQKyreqkertaI5wNyyDcbX';
var userKey = 'q7QPx8lB981WAcUr';
var apiKey = '?api_key=' + userKey;

var apiData = {
    clientId :clientId,
    clientSecret : clientSecret,
    userKey : userKey,
    apiKey :apiKey,
    apiUrl :'https://api.hackaday.io/v1',
    apiAuthUrl :'https://api.hackaday.io/v1/me' + apiKey,
    oAuthRedirect :'https://hackaday.io/authorize?client_id=' + clientId + '&response_type=code',
    createTokenUrl : function (code) {
        return ('https://auth.hackaday.io/access_token?' +
        'client_id=' + this.clientId +
        '&client_secret=' + this.clientSecret +
        '&code=' + code +
        '&grant_type=authorization_code')
    }
    
};
/************************************************************
*                        Instructions                       *
*                                                           *
*      Go to https://dev.hackaday.io/applications and       *
*   create an application with the following information:   *
*                                                           *
*   Application Name:       HAD API Demo                    *
*   Application Url:        http://localhost:3000           *
*   Callback Url:           http://localhost:3000/callback  *
*   Description:            API DEMO                        *
*                                                           *
************************************************************/


export default apiData;