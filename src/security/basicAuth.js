const db = require('../db');
const bcryptjs = require('bcryptjs');

const basicAuth = async (username, password, cb) => {
  db.User.findOne({
    where: {
      email: username
    }
  }).then((user) => {
    if (bcryptjs.compareSync(password, user.password)) {
      return cb(null, true);
    } 

    return cb(null, false);
  }).catch((e) => {
    return cb(null, false);
  });
}

module.exports = basicAuth;