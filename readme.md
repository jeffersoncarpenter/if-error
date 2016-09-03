# If Error

This library helps automate error handling in Node.JS applications.

## Install

`npm install if-error`

## Contribute

Source code is at https://github.com/jeffersoncarpenter/if-error.
Patches are welcome.

## Example

Async operations can often experience errors.  These errors are
endemic to the world at large, not to the code.  Still, we write
boilerplate in the form of `if (err) { return next(err) }`, catching
these relative low-level errors one by one.  Because such errors are
rare, they lead to subtle bugs that are difficult to track down.

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

Rather than a boilerplate `if` statement, we declare our error handler
and then make a boilerplate `handleErr` call.  It is now very
difficult to write code in which these errors accidentally go
un-handled.