/**
 * 函数防抖适合在连续触发的事件，搜索框，手机号输入验证，窗口大小resize等
 * @param {*} func
 * @param {*} wait
 * @param {*} leading
 */
const debounce = function (func, wait, leading) {
  var timerId = null;
  return function debounced(...args) {
    const _this = this;
    if (leading) {
      func.apply(this, args);
    }
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(_this, args);
    }, wait);
  };
};

// 节流函数时间戳版本
const throttle = function (func, wait) {
  var lastTime = 0;
  return function throttled(...args) {
    const _this = this;
    let now = Date.now();
    if (now - lastTime > wait) {
      func.call(_this, ...args);
      lastTime = now;
    }
  };
};

// 节流函数计时器版本
const throttle2 = function (func, wait) {
  var timer = null;
  return function throttled(...args) {
    const _this = this;
    if (timer) return;
    timer = setTimeout(() => {
      func.call(_this, ...args);
      timer = null;
    }, wait);
  };
};
