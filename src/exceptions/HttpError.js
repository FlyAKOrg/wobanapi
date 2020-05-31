import log from '../utils/log';

export default class HttpError extends Error {
  constructor(_code, _message) {
    if (typeof _message === 'string') {
      super(_message);
      this.code = _code || 500;
    } else if ('message' in _message) {
      super(_message.message);
      this.code = _code || 500;
    } else {
      super('Internal Server Error');
      this.code = 500;
      log.error(`Got unexpected message type on HttpError ${typeof message} ${JSON.stringify(_message)}, treating as a 500 Internal Server Error`);
    }
  }
}
