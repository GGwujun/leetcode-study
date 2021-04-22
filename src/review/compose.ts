/**
 * compose函数主要是接受一系列函数，然后按序调用这些函数，并且参数透传
 */

function func1(res) {
  console.log(res);
}

function func2(res) {
  console.log(res);
}

function compose1(funs) {
  var combin = null;
  for (var i = 0; i < funs.length; i++) {
    combin = (function (i, combin) {
      return combin
        ? function (args) {
            return combin(funs[i](args));
          }
        : function (args) {
            return funs[i](args);
          };
    })(i, combin);
  }
  return combin;
}

function compose2(funs) {
  var len = funs.length;
  var index = len - 1;
  return function () {
    var result = len ? funs[index].apply(this, arguments) : arguments[0];
    while (--index >= 0) {
      result = funs[index].call(this, result);
    }
    return result;
  };
}

function compose3(...arr) {
  return function (...arr2) {
    (function aa(n) {
      if (n < arr.length - 1) {
        return arr[n](aa(++n));
      } else {
        return arr[n](...arr2);
      }
    })(0);
  };
}

export default function compose4(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

compose1([func1, func2])(1);
//@ts-ignore
compose2([func1, func2])(1);
compose3([func1, func2])(1);
compose4([func1, func2])(1);
