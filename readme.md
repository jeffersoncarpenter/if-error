# If Error

This tiny library helps automate error handling in Node.JS applications.

Edit: you should use promises instead

## Install

`npm install if-error`

## Contribute

Source code is at https://github.com/jeffersoncarpenter/if-error.
Patches are welcome.

## Example

Async operations can often experience errors.  These errors are
endemic to the world at large, not due to bugs in the code.  Still, we
write boilerplate in the form of `if (err) { return next(err) }`,
catching these relative low-level errors one by one.  Because such
errors are rare, they lead to subtle bugs that are difficult to track
down.

```
var middleware = function (next) {
  return asyncOperation1(function (err, result1) {
    if (err) { return next(err); }
    return asyncOperation2(result1, function (err, result2) {
      if (err) { return next(err); }
      return asyncOperation3(result2, function (err, result3) {
        if (err) { return next(err); }
        return next(null, result3);
      });
    });
  });
};
```

This tiny library greatly increases the robustness of this boilerplate
code.  Rather than a boilerplate `if` statement, you declare your
error handler - and then make boilerplate calls to it.  If you use
this style everywhere, `err` values will only appear in your logging
code.

```
var handleErrWith = require('if-error');

var middleware = function (next) {
  var handleErr = handleErrWith(next);
  return asyncOperation1(handleErr(function (result1) {
    return asyncOperation2(result1, handleErr(function (result2) {
      return asyncOperation3(result2, hanldeErr(function (result3) {
        return next(null, result3);
      }));
    }));
  }));
};
```
