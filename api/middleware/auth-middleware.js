const Users = require('../users/users-model');


const checkUsernameExists = async (req, res, next) => {
    const user = await Users.findBy({ username: req.body.username })
    if(!user) {
      next({ status: 401, message: 'invalid credentials' })
    } else {
      req.user = user
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
    return next()
    }
  } catch(err) {
    next(err)
  }
}


module.exports = {
  checkUsernameExists,
  validateUsername,
  validateData
}
