const express = require('express');
const app = express();

// fallback node env to dev
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let errorCodes = {
  NotFound: 'not_found',
  General: 'general',
  default: 'general'
};

let errorMessages = {
  [errorCodes.NotFound]: `Resource not found.`,
  [errorCodes.General]: `Oops. An error occurred`,
  default: `Oops. An error occurred`
};

let statusCodeMappings = {
  [errorCodes.NotFound]: 404,
  default: 500
};

class ApiError extends Error {
  constructor(code = errorCodes.General, message = '') {
    super();
    this.code = code;
    this.customMessage = message;
  }

  get message() {
    return errorMessages[this.code] || this.customMessage;
  }

  get statusCode() {
    return statusCodeMappings[this.code] || statusCodeMappings.default;
  }
}

/**
 * Call this endpoint with ?id=1 and you should receive an object
 * Call it without a query param or with another id and you will receive 404 not found.
 */
app.get('/', function (req, res, next) {
  if (req.query.id === '1') {
    return res.status(200).send({ id: 1, message: 'Object found' })
  }
  return next(new ApiError(errorCodes.NotFound));

});

/**
 * Error middlware that returns a formatted response based on a custom ApiError thrown on the server
 * @param err
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function errorMiddleware(err, req, res, next) {
  // We check if we have a custom ApiError and handle it. If not, simply forward the normal error.
  if (err.constructor === ApiError) {
    let response = {
      code: err.code,
      message: err.message
    };

    // set stack trace and request path only in development mode
    if(process.env.NODE_ENV === 'dev'){
      response.stackTrace = err.stack;
      response.path = req.path;
      console.error(err.stack)
    }

    return res.status(err.statusCode)
      .send(response);
  }
  return next(err);
}

app.use(errorMiddleware);

app.listen(3000, () => console.log('Error handling example started'));