import bcryptjs from "bcryptjs";
import basicAuth from "basic-auth";
import db from "../db";
import HttpError from "../exceptions/HttpError";

const checkDb = (username, password, cb) => {
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
    .catch(() => cb(false, null));
};

const middleware = (req, res, next) => {
  const auth = basicAuth(req);

  if (auth) {
    return checkDb(auth.name, auth.pass, (approved, user) => {
      if (!approved) return new HttpError(401, "Unauthorized");

      req.auth = user;

      return next();
    });
  }
  return new HttpError(401, "Unauthorized");
};

export default middleware;
