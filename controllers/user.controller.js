const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isEmpty = require('is-empty')
const Validator = require('validator')
const axios = require('axios').default
const validateRegister = require('../validation/register')
const validateLogin = require('../validation/login')
const verifyToken = require('../controllers/middlewares/verifyToken')

router.get('/getNum/:p', async (req, res) => {
  const arb = await User.findById(req.params.p)
  return res.send(arb.phone)
})

router.post('/register', (req, res) => {
  //Form validation

  if (Validator.isEmpty(req.body.username)) {
    res.status(400).json({ message: 'Name field is required' })
  }

  if (Validator.isEmpty(req.body.email)) {
    res.status(400).json({ message: 'Email field is required' })
  } else if (!Validator.isEmail(req.body.email)) {
    res.status(400).json({ message: 'Invalid Email' })
  }

  //Password checks
  if (Validator.isEmpty(req.body.password)) {
    res.status(400).json({ message: 'Password field is required' })
  }

  if (!Validator.isLength(req.body.password, { min: 6, max: 30 })) {
    res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      })

      // Hash password before storing in database
      const rounds = 10
      bcrypt.genSalt(rounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

router.post('/signin', (req, res) => {
  //Form Valdiation

  if (Validator.isEmpty(req.body.email)) {
    return res.status(400).json({ message: 'Email field is required' })
  } else if (!Validator.isEmail(req.body.email)) {
    return res.status(400).json({ message: 'Email is invalid' })
  }

  //Password checks
  if (Validator.isEmpty(req.body.password)) {
    return res.status(400).json({ message: 'Password field is required' })
  }

  const email = req.body.email
  const password = req.body.password

  //Find user by Email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'Email not registered' })
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload

        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
          },
          'secret123',
          {
            expiresIn: '1h',
          }
        )
        const { _id, username, email } = user

        //    res.cookie("jwttoken",token,{
        //        expires : new Date(Date.now() +  258920000),
        //        httpOnly:true
        //    }).send(token);

        return res
          .json({ status: 'ok', user: { _id, username, email }, token })
          .header('auth-token', token)

        console.log(token)
      } else {
        return res.json({ message: 'password incorrect', user: false })
      }
    })
  })
})

router.post('/profile', verifyToken, (req, res) => {
  res.status(200).json({ user: 'profile' })
})

module.exports = router
