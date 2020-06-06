import log from "../utils/log";

export default class HttpError extends Error {
  constructor(constCode, constMessage) {
    if (typeof constMessage === "string") {
      super(constMessage);
      this.code = constCode || 500;
    } else if ("message" in constMessage) {
      super(constMessage.message);
      this.code = constCode || 500;
    } else {
      super("Internal Server Error");
      this.code = 500;
      log.error(
        `Got unexpected message type on HttpError ${typeof constMessage} ${JSON.stringify(
          constMessage
        )}, treating as a 500 Internal Server Error`
      );
    }
  }
}
