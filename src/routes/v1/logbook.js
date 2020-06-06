import { Router } from "express";
import HttpStatusCode from "../../utils/HttpStatusCode";
import HttpError from "../../exceptions/HttpError";

import getLogbook from "../../handlers/logbook/getLogbook";
import startLogbook from "../../handlers/logbook/startLogbook";

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
  startLogbook
);
router.get("/:logbookId", getLogbook);

module.exports = router;
