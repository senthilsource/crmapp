const jwt = require('../common/jwt');
const errorHandler = require('../common/error-handlers');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { OAuth2Client } = require('google-auth-library');

var auth_token = null;
var userid=null;
var CLIENT_ID = '924515476097-5thb5i23ra2crd248st77nc43ppccvli.apps.googleusercontent.com';

var verify = async (token)=> {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [CLIENT_ID]
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const userid = payload['sub'];

    return payload;
    // After you have verified the token, check if the user is already in your user database. 
    //If so, establish an authenticated session for the user. If the user isn't yet in your user database, 
    //create a new user record from the information in the ID token payload, and establish a session for the user. 
    //You can prompt the user for any additional profile information you require when you detect a newly created user 
    //in your app.
}

module.exports={verify:verify}