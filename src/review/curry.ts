const curry = function (func, args = []) {
  let length = func.length;
  return function curried() {
    const newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, func, newArgs);
    }
    return func.apply(this, newArgs);
  };
};

const multiFn = function (a, b, c) {
  return a * b * c;
};

var multi = curry(multiFn);

//@ts-ignore
console.log(multi(2)(3)(4));
//@ts-ignore
console.log(multi(2, 3)(4));
