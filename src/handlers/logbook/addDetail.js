import db from "../../db";
import log from "../../utils/log";
import HttpError from "../../exceptions/HttpError";
import HttpStatusCode from "../../utils/HttpStatusCode";

export default async (req, res, next) => {
  const { logbookId } = req.params;

  let logbook;
  try {
    logbook = await db.Logbook.findOne({
      attributes: ["id", "user_id"],
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

  let entry;

  try {
    entry = await db.LogbookDetail.create({
      ...req.body,
      logbook_id: logbook.id,
      created_at: new Date(),
    });
  } catch (err) {
    log.error(`Error creating logbook detail entry, ${err.message}`);
    return next(
      new HttpError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  }

  return res.status(HttpStatusCode.CREATED).send(entry);
};
