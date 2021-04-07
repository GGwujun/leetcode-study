/**
 * https://juejin.cn/post/6844903929705136141#heading-1
 * @param target
 */

const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

const getType = function (target) {
  return Object.prototype.toString.call(target);
};

const getInit = function (target) {
  const Ctor = target.constructor;
  return new Ctor();
};

const isObject = function (target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
};

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

const cloneReg = function (target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
};

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

const cloneOtherType = function (target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
    default:
      return null;
  }
};

const DfsDeepCopy = function (target, map = new Map()) {
  //基本类型
  if (!isObject(target)) {
    return target;
  }

  //获取对应type
  const type = getType(target);
  let cloneTarget = null;

  //@ts-ignore
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(DfsDeepCopy(value, map));
    });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, DfsDeepCopy(value, map));
    });
    return cloneTarget;
  }

  // 对象和数组
  const keys = type !== arrayTag && Object.keys(target);
  const len = (keys || target).length;
  let index = -1;
  while (++index < len) {
    const element = (keys || target)[index];
    cloneTarget[keys ? element : index] = DfsDeepCopy(
      target[keys ? element : index],
      map
    );
  }
  return cloneTarget;
};

// 工具函数
let _toString = Object.prototype.toString;
let map2 = {
  array: "Array",
  object: "Object",
  function: "Function",
  string: "String",
  null: "Null",
  undefined: "Undefined",
  boolean: "Boolean",
  number: "Number",
};
let getType2 = (item) => {
  return _toString.call(item).slice(8, -1);
};
let isTypeOf = (item, type) => {
  return map2[type] && map2[type] === getType2(item);
};

let BfsDeepClone = (obj) => {
  let origin = [obj],
    copyObj = {},
    copy = [copyObj];
  // 去除环状数据
  let visitedQueue = [],
    visitedCopyQueue = [];
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift();
    visitedQueue.push(items);
    if (isTypeOf(items, "object") || isTypeOf(items, "array")) {
      for (let item in items) {
        let val = items[item];
        if (isTypeOf(val, "object")) {
          let index = visitedQueue.indexOf(val);
          if (!~index) {
            _obj[item] = {};
            //下次while循环使用给空对象提供数据
            origin.push(val);
            // 推入引用对象
            copy.push(_obj[item]);
          } else {
            _obj[item] = visitedCopyQueue[index];
            visitedQueue.push(_obj);
          }
        } else if (isTypeOf(val, "array")) {
          // 数组类型在这里创建了一个空数组
          _obj[item] = [];
          origin.push(val);
          copy.push(_obj[item]);
        } else if (isTypeOf(val, "function")) {
          _obj[item] = eval("(" + val.toString() + ")");
        } else {
          _obj[item] = val;
        }
      }
      // 将已经处理过的对象数据推入数组 给环状数据使用
      visitedCopyQueue.push(_obj);
    } else if (isTypeOf(items, "function")) {
      copyObj = eval("(" + items.toString() + ")");
    } else {
      copyObj = obj;
    }
  }
  return copyObj;
};

const map = new Map();
map.set("key", "value");
map.set("ConardLi", "code秘密花园");

const set = new Set();
set.add("ConardLi");
set.add("code秘密花园");

const targetData = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log("code秘密花园");
  },
  func2: function (a, b) {
    return a + b;
  },
};

//@ts-ignore
targetData.target = targetData;

console.time();
const result = BfsDeepClone(targetData);
console.log(result);
console.timeEnd();
