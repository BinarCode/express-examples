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

## Questions

Need more? Feel free to open an issue or PR

## Prerequisites

- Node.js > 8
- Understanding of `async/await`/`promises`