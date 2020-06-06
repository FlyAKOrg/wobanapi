import db from "../../db";
import log from "../../utils/log";
import HttpError from "../../exceptions/HttpError";
import HttpStatusCode from "../../utils/HttpStatusCode";
import rankUtil from "../../utils/ranks";

export default async (req, res, next) => {
  const { logbookId } = req.params;

  let logbook;
  try {
    logbook = await db.Logbook.findOne({
      where: { id: logbookId },
    });
  } catch (err) {
    log.error(`Error finding logbook ${logbookId}, ${err.message}`);
    return next(
      new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  }

  if (logbook === null) {
    return next(new HttpError(HttpStatusCode.NOT_FOUND, "Not Found"));
  }

  if (logbook.user_id !== req.auth.id) {
    return next(new HttpError(HttpStatusCode.FORBIDDEN, "Forbidden"));
  }

  if (logbook.status === "COMPLETED" || logbook.status === "CANCELED") {
    return next(
      new HttpError(HttpStatusCode.CONFLICT, "Conflict due to status")
    );
  }

  // Define object keys permitted to modify
  const allowed = [
    "actual_departure",
    "actual_arrival",
    "offblock_time",
    "onblock_time",
    "duration",
    "status",
    "simulator",
    "fuel_start",
    "fuel_end",
    "distance_flown",
    "positions",
  ];

  // Filter incoming request to only allow above keys
  const filtered = allowed.reduce(
    (obj, key) => ({ ...obj, [key]: req.body[key] }),
    {}
  );

  try {
    await db.Logbook.update(filtered, {
      where: { id: logbookId },
    });
  } catch (err) {
    log.error(`Error updating logbook entry, ${err.message}`);
    return next(
      new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  }

  // Did they finish a flight?
  if (filtered.status === "COMPLETED" && logbook.status !== "COMPLETED") {
    try {
      db.Booking.destroy({
        where: {
          user_id: logbook.user_id,
          airline: logbook.airline,
          flight_number: logbook.flight_number,
        },
        limit: 1,
      });
    } catch (err) {
      log.error(`Error deleting completed booking, ${err.message}`);
    }
    logbook.reload();

    const duration =
      (logbook.onblock_time - logbook.offblock_time) / 1000 / 60 / 60;

    try {
      const hours = Math.abs(duration);
      const mins = Math.round((duration - hours) * 60);
      db.Logbook.update(
        { duration: `${hours}:${mins.toString().padStart(2, "0")}` },
        { where: { id: logbook.id } }
      );

      db.User.update(
        {
          hours: req.auth.hours + duration,
          rank: rankUtil(req.auth.hours + duration),
        },
        { where: { id: req.auth.id } }
      );
    } catch (err) {
      log.error(`Error completing hours cleanup, ${err.message}`);
    }
  }

  return res.status(200).send();
};
