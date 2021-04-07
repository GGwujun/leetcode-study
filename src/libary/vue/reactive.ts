/**
 * 实现vue2和vue3的响应式
 */

const data = {
  name: "gwj",
  info: {
    sex: "man",
  },
};

const walk = function (obj) {
  const keys = Object.keys(obj);
  for (let index = 0; index < keys.length; index++) {
    defineReactive(obj, keys[index]);
  }
};

class Dep {
  subs: [];
  constructor() {
    this.subs = [];
  }
  depend() {
    //@ts-ignore
    if (Dep.target) {
      //@ts-ignore
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let index = 0; index < subs.length; index++) {
      const sub = subs[index];
      ///@ts-ignore
      sub.update();
    }
  }
}

//@ts-ignore
Dep.target = null;

const defineReactive = function (obj, key) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);

  const getter = property && property.get;
  const setter = property && property.set;

  Object.defineProperty(obj, key, {
    get() {
      const value = getter && getter.call(obj);
      //@ts-ignore
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newvalue) {
      const value = getter && getter.call(obj);
      if (value === newvalue) return;
      if (setter) setter.call(obj, newvalue);
      dep.notify();
    },
  });
};

const targetMap = new WeakMap();
let activeEffect = null;
const track = function (target, type, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.set(activeEffect);
  }
};

const reactive = function (obj) {
  const observed = new Proxy(obj, {
    get(target, key) {
      const value = Reflect.get(target, key);
      track(target, "get", key);
      return value;
    },
    set(newvalue) {},
  });
};
