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
        return cb(true);
      }

      return cb(false);
    })
    .catch((e) => {
      return cb(false);
    });
};

const middleware = (req, res, next) => {
  const auth = basicAuth(req);

  if (auth) {
    return checkDb(auth.name, auth.pass, (approved) => {
      if (!approved) return new HttpError(401, "Unauthorized");

      return next();
    });
  } else {
    return new HttpError(401, "Unauthorized");
  }
};

module.exports = {
  middleware,
};
