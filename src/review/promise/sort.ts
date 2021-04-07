/**
 * 顺序执行函数
 */

//2.1 方法一——连续使用then链式操作

function getA1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(2);
    }, 1000);
  });
}

function getB1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(3);
    }, 1000);
  });
}

function addAB(a, b) {
  return a + b;
}

function getResult() {
  var obj: {
    [key in any]?: any;
  } = {};
  Promise.resolve()
    .then(function () {
      return getA1();
    })
    .then(function (a) {
      obj.a = a;
    })
    .then(function () {
      return getB1();
    })
    .then(function (b) {
      obj.b = b;
      return obj;
    })
    .then(function (value) {
      return addAB(value["a"], value["b"]);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
}
// getResult();

//2.2 方法二——使用promise构建队列

function getResult2() {
  // 构建队列
  function queue(arr, res = []) {
    return arr.reduce(function (pre, cur) {
      //@ts-ignore
      return (pre = pre.then(cur).then((result) => {
        res.push(result);
        return res;
      }));
    }, Promise.resolve());
  }
  // 执行队列
  queue([getA1, getB1])
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
}

getResult2();

//2.3方法三——使用async、await实现类似同步编程
function getResult3() {
  async function queue(arr) {
    let res = [];
    for (let fn of arr) {
      var data = await fn();
      res.push(data);
    }
    return res;
  }
  queue([getA1, getB1]).then((data) => console.log(data));
}

getResult3();
