function setManager(name) {
  this.manager = name;
}

setManager.prototype.getName = function () {
  return this.manager;
};

var getSingleton = function (fn) {
  var instance = null;
  return function () {
    if (!instance) {
      instance = fn.apply(this, arguments);
    }
    return instance;
  };
};

var SingletonSetManager = getSingleton(function (name) {
  return new setManager(name);
});

SingletonSetManager("a").getName(); // a
SingletonSetManager("b").getName(); // a
SingletonSetManager("c").getName(); // a
