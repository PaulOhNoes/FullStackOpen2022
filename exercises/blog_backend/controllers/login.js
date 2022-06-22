const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  //search for a user
  const user = await User.findOne({ username })

  //checks to see if an existing user exists and if the password matches with the hash-password
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  //creates a digitally signed token that contains the username and user id. Expires in 1 hr.
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

  response.status(200).send({ token, username:username, name: user.name })
})

module.exports = loginRouter