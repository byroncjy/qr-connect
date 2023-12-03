const mongoose = require('mongoose')
const User = ('../models/User.js')
const { ExtractJwt, Strategy } = require('passport-jwt')

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
}

const jwtVerifyToken = async (payload, next) => {
  console.log(payload)
  const expired = new Date(payload.exp) < new Date()
  if (expired) {
    console.log('expired!')
    return next(null, false, { error: 'Error: expired JWT token!' })
  }
  console.log('not expired!')

  const user = await User.findById(payload.userId).exec()
  if (user) {
    next(null, user)
  } else {
    next(null, false, { error: 'Error: user not found!' })
  }
}

const jwtStrategy = jwtOptions => {
  const strategy = new Strategy(jwtOptions, jwtVerifyToken)
  return strategy
}

module.exports = jwtStrategy(jwtOptions, jwtVerifyToken)
