const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');
const Users = require('../users/users-model');


const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ status: 401, message: 'token required'});
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {
        next({ status: 401, message: 'token invalid' })
      } else {
        req.decodedJWT = decodedToken;
        next()
      }
    })
  }
}

const checkUsernameExists = async (req, res, next) => {
    const user = await Users.findBy({ username: req.body.username })
    if(!user) {
      next({ status: 401, message: 'invalid credentials' })
    } else {
      //req.user = user
      next()
  }
}

const validateUsername = async (req, res, next) => {
    const user = await Users.findBy({ username: req.body.username });
    if(user.length === 1) {
      next({ status: 401, message: 'username taken'});
    } else {
      next()
  }
}

const validateData = async (req, res, next) => {
  try{
    const { username, password } = req.body;
    if(!username || !username.trim() || !password || !password.trim()) {
      next({ status: 401, message: 'username and password required '});
    } else {
    next()
    }
  } catch(err) {
    next(err)
  }
}


module.exports = {
  restricted,
  checkUsernameExists,
  validateUsername,
  validateData
}

  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

