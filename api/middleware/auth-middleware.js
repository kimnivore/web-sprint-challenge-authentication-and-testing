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
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            next({ status: 400, message: 'username and password required' })
        } else {
            next()
        }
    }
    catch(err) {
        next(err)
    }
}

const validateData = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password || username === '' || username === null) {
      res.status(401).json('username and password required')
    } else {
        next()
    }
}


module.exports = {
  checkUsernameExists,
  validateUsername,
  validateData
}
