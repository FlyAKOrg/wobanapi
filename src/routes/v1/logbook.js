const { Router } = require("express");
const HttpStatusCode = require("../../utils/HttpStatusCode");
const HttpError = require("../../exceptions/HttpError");
const logbookController = require("../../controllers/logbook");
const log = require("../../utils/log");

const router = Router();
router.post(
  "/",
  (req, res, next) => {
    if (req.body.bookingId === undefined || req.body.bookingId === null) {
      return new HttpError(
        HttpStatusCode.MALFORMED_REQUEST,
        "Malformed Request"
      );
    }

    return next();
  },
  logbookController.startLogbook
);
router.get("/:logbookId", logbookController.getLogbook);

module.exports = router;
