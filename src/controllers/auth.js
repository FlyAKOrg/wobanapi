const HttpError = require("../exceptions/HttpError");
const HttpStatusCode = require("../utils/HttpStatusCode");

module.exports = {
  postLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError(HttpStatusCode.BAD_REQUEST, "Bad Request"));
    }
    return null;
  },
};
