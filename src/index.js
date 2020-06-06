import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import log from "./utils/log";
import db from "./db";
import HttpError from "./exceptions/HttpError";
import authMiddleware from "./security/basicAuth";
import publicv1Router from "./routes/v1/public";
import v1Router from "./routes/v1";

dotenv.config();
process.env.TZ = "UTC";

const dbPrep = async (app, opts) => {
  try {
    await db.buildConnection(opts);
  } catch (e) {
    log.error(
      `Error establishing connection to database ${e}... waiting to try again.`
    );
    setTimeout(() => dbPrep(app, opts), 10000);
  }

  log.info("Database connection established.");
  app.listen(process.env.port || 8080, () => {
    log.info(`Listening on ${process.env.port || 8080}`);
  });
};

log.info("Starting NZVirtual Wodan API Core");

const app = express();

log.info("Adding middleware");
app.use(cors());
app.use(express.json());

log.info("Adding public v1 routes");
app.use("/v1", publicv1Router);

log.info("Adding private v1 routes");
app.use("/v1", authMiddleware, v1Router);

log.info("Defining error handlers");
app.use((req, res, next) => next(new HttpError(404, "Not Found")));
app.use((error, req, res, next) => {
  log.error(`Caught error ${JSON.stringify(error)}`);
  if (res.headersSent) return next(error);

  return res.status(error.code).json({
    status: error.code,
    message: error.message,
  });
});

log.info("Web Server configured, starting database connection...");

const opts = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_DATABASE || "nzvirtual",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "secret12345",
};

if (process.env.DB_DEBUG_LOGGING) opts.logging = (str) => log.debug(str);

dbPrep(app, opts);
