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
        const users = await Users.findBy({ username: req.body.username })
        if(!users.length) {
            next()
        }
        else next({ status: 401, message: 'username taken' })
    } catch (error) {
        next(error)
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
