import db from "../../db";
import log from "../../utils/log";
import HttpError from "../../exceptions/HttpError";
import HttpStatusCode from "../../utils/HttpStatusCode";

export default async (req, res, next) => {
  const { bookingId } = req.body;

  let booking;
  try {
    booking = await db.Booking.findOne({
      where: { id: bookingId },
    });
  } catch (err) {
    log.error(`Error finding booking ${bookingId}, ${err.message}`);
    return next(
      new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  }

  if (booking === null) {
    return next(new HttpError(HttpStatusCode.NOT_FOUND, "Not Found"));
  }

  if (booking.user_id !== req.auth.id) {
    return next(new HttpError(HttpStatusCode.FORBIDDEN, "Forbidden"));
  }

  let entry;
  try {
    entry = await db.Logbook.create({
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
    });
  } catch (err) {
    log.error(`Error creating logbook entry, ${err.message}`);
    return next(
      new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  }

  return res.status(HttpStatusCode.CREATED).json({
    logbook: entry,
    booking,
  });
};
