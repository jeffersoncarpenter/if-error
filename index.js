module.exports = function (errorHandler, next) {
  next = next || errorHandler;
  return function (func) {
	return function () {
	  var args = Array.prototype.slice.call(arguments);
	  var err = args.splice(0, 1)[0];
	  if (typeof err !== 'undefined' && err !== null) {
		return errorHandler(err);
	  }
	  else {
		// also provide a function that does not take an error
		// argument, and calls next
		args.push(function (result) {
		  return next(null, result);
		});
		return func.apply(null, args);
	  }
	};
  };
};
