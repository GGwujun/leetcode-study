const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";

const setTimeoutWarp = function (func) {
  setTimeout(func, 0);
};

const MyPromise = function (execute) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const self = this;

  const resolve = function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilledCallbacks.forEach((callback) => callback());
    }
  };
  const reject = function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejectedCallbacks.forEach((callback) => callback());
    }
  };

  try {
    execute(resolve, reject);
  } catch (error) {
    reject(error);
  }
};

MyPromise.deferred = function () {
  let dfd = {};
  //@ts-ignore
  dfd.promise = new MyPromise((resolve, reject) => {
    //@ts-ignore
    dfd.resolve = resolve;
    //@ts-ignore
    dfd.reject = reject;
  });
  return dfd;
};

const resolvePromise = function (promise, x, resolve, reject) {
  let called = false;
  if (promise === x) {
    return reject(new TypeError("循环引用"));
  }
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      return reject(error);
    }
  } else {
    resolve(x);
  }
};
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  if (typeof onFulfilled !== "function")
    onFulfilled = function (value) {
      return value;
    };

  if (typeof onRejected !== "function")
    onRejected = function (reason) {
      throw reason;
    };
  const promise = new MyPromise(function (resolve, reject) {
    if (self.status === PENDING) {
      self.onFulfilledCallbacks.push(() => {
        setTimeoutWarp(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
      self.onRejectedCallbacks.push(() => {
        setTimeoutWarp(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
    if (self.status === FULFILLED) {
      setTimeoutWarp(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
    if (self.status === REJECTED) {
      setTimeoutWarp(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  });
  return promise;
};
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
MyPromise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      fn();
      return value;
    },
    (reason) => {
      fn();
      throw reason;
    }
  );
};
MyPromise.prototype.done = function () {
  this.catch((reason) => {
    console.log("done", reason);
    throw reason;
  });
};

MyPromise.prototype.stop = function () {
  return new Promise(function () {});
};

MyPromise.all = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    let result = [];
    promiseArr.forEach((promise, index) => {
      promise.then((value) => {
        result[index] = value;
        if (result.length === promiseArr.length) {
          resolve(result);
        }
      }, reject);
    });
  });
};

MyPromise.allSettled = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    let result = [];
    promiseArr.forEach((promise, index) => {
      promise.then(
        (value) => {
          result[index] = {
            status: "fulfilled",
            value,
          };

          if (result.length === promiseArr.length) {
            resolve(result);
          }
        },
        (reason) => {
          result[index] = {
            status: "rejected",
            reason,
          };

          if (result.length === promiseArr.length) {
            resolve(result);
          }
        }
      );
    });
  });
};
MyPromise.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((promise) => {
      promise.then((value) => {
        resolve(value);
      }, reject);
    });
  });
};
MyPromise.resolve = function (value) {
  let promise;
  promise = new MyPromise((resolve, reject) => {
    resolvePromise(promise, value, resolve, reject);
  });

  return promise;
};
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

//@ts-ignore
module.exports = MyPromise;
