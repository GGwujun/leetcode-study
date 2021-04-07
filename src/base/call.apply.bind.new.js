Function.prototype.createCall = function createCall(content, args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = content || window;
  ctx.fn = this;
  let result = ctx.fn(args);
  delete ctx.fn;
  return result;
};

Function.prototype.createApply = function createCall(content, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = content || window;
  ctx.fn = this;
  let result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

Function.prototype.createBind = function createCall(content, ...rest) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let ctx = content || window;
  let _self = this;
  const BindFunc = function (...argus) {
    // 处理bind函数当作构造函数的时候，绑定的this是被忽略的
    let self = this instanceof BindFunc ? this : ctx;
    let result = _self.apply(self, ...rest, ...argus);
    return result;
  };

  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  let f = function () {};
  f.prototype = this.prototype;
  BindFunc.prototype = new f();

  return BindFunc;
};

function objFactory() {
  let obj = {};
  let Con = [].shift.call(arguments);

  obj._proto_ = Con.prototype;

  let result = Con.apply(obj, arguments);

  return Object.prototype.toString.call(result) === "[object Object]"
    ? result
    : obj;
}
