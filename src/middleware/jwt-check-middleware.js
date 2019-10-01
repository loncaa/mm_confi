const unless = require('express-unless')
var jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt-config')

function check(req, res, next){

    //check session user id
    if(!req.session || !req.session.userId) {
        return res.status(500).json({ok:false, message:'login is required'});
    }

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    else {
        return res.status(500).json({ok:false, message:'login is required'});
    }

    //verify token
    if(token){
        jwt.verify(token, jwtConfig.secret, (error, tokenData) => {
            if(error){
                return res.status(401).json({ok: false, message: 'Auth token is not valid'})
            }

            req.user = tokenData
            next()
        })
    }
    else {
        return res.status(401).json({ok: false, message: 'Auth token is not valid'})
    }
}

module.exports = function () {
    let middleware = check

    middleware.unless = unless

    return middleware
}