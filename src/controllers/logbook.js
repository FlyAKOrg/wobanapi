const db = require("../db");
const log = require("../utils/log");
const HttpError = require("../exceptions/HttpError");
const HttpStatusCode = require("../utils/HttpStatusCode");

const logbookController = {
  getLogbook: (req, res, next) => {
    const logbookId = req.params.logbookId;

    return db.Logbook.findOne({
      where: { id: logbookId },
    })
      .then((logbook) => {
        if (logbook === null)
          return next(new HttpError(HttpStatusCode.NOT_FOUND, "Not Found"));

        return res.status(HttpStatusCode.OK).json(logbook);
      })
      .catch((err) => {
        log.error(`Error fetching logbook ${logbookId}, error ${err.message}`);
        return next(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      });
  },
  startLogbook: (req, res, next) => {
    const bookingId = req.body.bookingId;

    return db.Booking.findOne({
      where: {
        id: bookingId,
      },
    })
      .then((booking) => {
        if (booking === null) {
          return next(new HttpError(HttpStatusCode.NOT_FOUND, "Not Found"));
        }

        return db.Logbook.create({
          user_id: booking.user_id,
          airline: booking.airline,
          flight_number: booking.flight_number,
          planned_departure: booking.departure,
          planned_arrival: booking.arrival,
          actual_departure: null,
          actual_arrival: null,
          equipment: booking.equipment,
          offblock_time: new Date("1970-01-01 00:00:01"),
          onblock_time: new Date("1970-01-01 00:00:01"),
          duration: "00:00",
          status: "PRE-FLIGHT",
          simulator: "Unknown",
          fuel_start: 0.0,
          fuel_end: 0.0,
          distance_flown: 0.0,
          positions: [],
        }).then((logbook) => {
          return res.status(HttpStatusCode.CREATED).json({
            logbook,
            booking,
          });
        });
      })
      .catch((err) => {
        log.warn("Error creating logbook entry, error: " + JSON.stringify(err));
        return next(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      })
      .catch((err) => {
        log.warn("Error fetching bookings, error: " + JSON.stringify(err2));
        return next(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "Internal Server Error"
          )
        );
      });
  },
};

module.exports = logbookController;
