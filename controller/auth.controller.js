'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.login = (req, res) => {
  const { username, password } = req.body

  const user = User.findOne({ $and: [{username: username}, {password: password}] }).then(user => {
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(200).send({ message: 'Login failed'})
      }
  })
};