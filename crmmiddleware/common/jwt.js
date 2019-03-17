const expressJwt = require('express-jwt');
const config = require('../common/config.json');

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, getToken: function fromCookie (req) {
      //  console.log(req.session.user);
       // console.log(req.cookies.auth);
       // console.log(req);
        var token = req.cookies.auth;
        if (token) {
          return token;
        } 
        return null;
      }}).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/register',
            /\/*html*/, /\/*ico*/, /\/*js*/, /\/*css*/
        ]
    });
}

// async function isRevoked(req, payload, done) {
//     var token = req.cookies.auth || req.body.auth || req.query.auth || req.headers['auth'] ;
//     const user = await userService.getById(req.session.user);

//     // revoke token if user no longer exists
//     if (!user) {
//         return done(null, true);
//     }

//     done();
// };



module.exports = jwt;
