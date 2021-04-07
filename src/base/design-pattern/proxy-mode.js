/**
 * 保护代理主要实现了访问主体的限制行为，以过滤字符作为简单的例子
 */

// 主体，发送消息
function sendMsg(msg) {
  console.log(msg);
}

// 代理，对消息进行过滤
function proxySendMsg(msg) {
  // 无消息则直接返回
  if (typeof msg === "undefined") {
    console.log("deny");
    return;
  }

  // 有消息则进行过滤
  msg = ("" + msg).replace(/泥\s*煤/g, "");

  sendMsg(msg);
}

sendMsg("泥煤呀泥 煤呀"); // 泥煤呀泥 煤呀
proxySendMsg("泥煤呀泥 煤"); // 呀
proxySendMsg(); // deny

/**
 * 虚拟代理在控制对主体的访问时，加入了一些额外的操作
在滚动事件触发的时候，也许不需要频繁触发，我们可以引入函数节流，这是一种虚拟代理的实现
 */

// 函数防抖，频繁操作中不处理，直到操作完成之后（再过 delay 的时间）才一次性处理
function debounce(fn, delay) {
  delay = delay || 200;
  var timer = null;

  return function () {
    var arg = arguments;
    // 每次操作时，清除上次的定时器
    clearTimeout(timer);
    timer = null;

    // 定义新的定时器，一段时间后进行操作
    timer = setTimeout(function () {
      fn.apply(this, arg);
    }, delay);
  };
}

var count = 0;

// 主体
function scrollHandle(e) {
  console.log(e.type, ++count); // scroll
}

// 代理
var proxyScrollHandle = (function () {
  return debounce(scrollHandle, 500);
})();

window.onscroll = proxyScrollHandle;

/**
 * 缓存代理可以为一些开销大的运算结果提供暂时的缓存，提升效率
来个栗子，缓存加法操作
 */

// 主体
function add() {
  var arg = [].slice.call(arguments);
  return arg.reduce(function (a, b) {
    return a + b;
  });
}

// 代理
var proxyAdd = (function () {
  var cache = [];
  return function () {
    var arg = [].slice.call(arguments).join(",");
    // 如果有，则直接从缓存返回
    if (cache[arg]) {
      return cache[arg];
    } else {
      var ret = add.apply(this, arguments);
      return ret;
    }
  };
})();

console.log(
  add(1, 2, 3, 4),
  add(1, 2, 3, 4),

  proxyAdd(10, 20, 30, 40),
  proxyAdd(10, 20, 30, 40)
); // 10 10 100 100
