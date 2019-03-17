const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const crm_init= require("./crmservices/config/initialize");
const authenticate = require("./authenticate/authenticate");
const errorHandler = require('./common/error-handlers');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const PORT = 3000;


// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'secretkey',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.auth) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// global error handler
app.use(errorHandler);

app.get("/", (req, res) => {
    res.render("index.html");
});

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.auth) {       
        userid = req.session.user;
        res.render('dashboard', {page:'Dashboard', user: req.session.user});
    } else {
        res.redirect('/');
    }
});

app.post("/tokensignin", (req, res) => {
    var payload = authenticate.verify(req.body.idtoken).catch(console.error);
    req.session.user=payload['sub'];
    res.redirect("/dashboard");
    /*
     iss: 'accounts.google.com',
  azp:
   '924515476097-5thb5i23ra2crd248st77nc43ppccvli.apps.googleusercontent.com',
  aud:
   '924515476097-5thb5i23ra2crd248st77nc43ppccvli.apps.googleusercontent.com',
  sub: '104707746506574523730',
  email: 'senthilsource@gmail.com',
  email_verified: true,
  at_hash: '6e_kZC431uI_bfiZ6jMgEQ',
  name: 'Senthil Kumar',
  picture:
   'https://lh4.googleusercontent.com/-dQuUboXsbig/AAAAAAAAAAI/AAAAAAAAJHw/kZejJiRpvks/s96-c/photo.jpg',
  given_name: 'Senthil',
  family_name: 'Kumar',
  locale: 'en-GB',
  iat: 1551384158,
  exp: 1551387758,
  jti: '13732b9e4fa31d61308fedfdef8dc6607527fffe'
  */

});

app.get("/fetchContacts", ()=>{
    console.log("Inside oauth2callback");   
});

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});