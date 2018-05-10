## What is this?

- A small collection of [express](https://expressjs.com/) based servers
with various utility examples that you might want to use.

## What's included ?

- Small one file examples that are easy to follow

## Examples

### Authorization middleware based on roles:

```js
app.get('/', authorize([roles.Admin, roles.SuperUser]), function (req, res) {
  // your request logic here
});
```

### Error handling middleware
```js
function (req, res, next) {
  // request logic
  // send and error
  return next(new ApiError(errorCodes.NotFound));

}
```
Response format in development
```js
 {
    "code": "not_found",
    "message": "Resource not found.",
    "stackTrace" "Detailed stack trace",
    "path": "request path"
 }
```
Response format in production mode
 ```js
  {
    "code": "not_found",
    "message": "Resource not found."
  }
```

### Request logging
Use [morgan](https://github.com/expressjs/morgan) to log request information to files
as well as printing it to console for status codes > 400

```js
// create a rotating write stream
const accessLogStream = rfs('api.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}));
```

### Promisify callback functions
Use of node.js [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) to convert callback based operations to promises.
Example:
```js
const readFileAsync = util.promisify(fs.readFile);

// usage
const content = await readFileAsync(pathToFile);
```


## Questions

Need more? Feel free to open an issue or PR

## Prerequisites

- Node.js > 8
- Understanding of `async/await`/`promises`