const db = require("../db");
const bcryptjs = require("bcryptjs");
const basicAuth = require("basic-auth");
const HttpError = require("../exceptions/HttpError");

const checkDb = async (username, password, cb) => {
  db.User.findOne({
    where: {
      email: username,
    },
  })
    .then((user) => {
      if (bcryptjs.compareSync(password, user.password)) {
        return cb(true, user);
      }

      return cb(false, null);
    })
    .catch((e) => {
      return cb(false, null);
    });
};

const middleware = (req, res, next) => {
  const auth = basicAuth(req);

  if (auth) {
    return checkDb(auth.name, auth.pass, (approved, user) => {
      if (!approved) return new HttpError(401, "Unauthorized");

      req.auth = user;

      return next();
    });
  } else {
    return new HttpError(401, "Unauthorized");
  }
};

module.exports = {
  middleware,
};
