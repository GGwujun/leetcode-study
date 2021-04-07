const observer = {
  subscribes: [],
  subscribe: function (type, fn) {
    if (!this.subscribes[type]) {
      this.subscribes[type] = [];
    }
    typeof fn === "function" && this.subscribes.push(fn);
  },
  publish: function (type, ...rest) {
    if (this.subscribes[type] && this.subscribes[type].length) {
      this.subscribes[type].forEach((element) => {
        element.apply(this, rest);
      });
    }
  },
  unpublish: function (type, fn) {
    // 删除全部
    if (typeof type === "undefined") {
      this.subscribes = [];
      return;
    }
    var fns = this.subscribes[type];
    // 不存在的订阅类型，以及订阅时未传入处理回调的
    if (!fns || !fns.length) {
      return;
    }
    if (typeof fn === "undefined") {
      fns.length = 0;
      return;
    }
    // 挨个处理删除
    for (var i = 0; i < fns.length; ++i) {
      if (fns[i] === fn) {
        fns.splice(i, 1);
      }
    }
  },
};
