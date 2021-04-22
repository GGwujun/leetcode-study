/**
 * 缓存算法
 * https://segmentfault.com/a/1190000013841967
 */

const LRUCache = function (capacity) {
  this.max = capacity;
  this.cache = {};
  this.keys = [];
};

LRUCache.prototype.get = function (key) {
  if (this.cache[key]) {
    const index = this.keys.indexOf(key);
    this.keys.splice(index, 1);
    this.keys.push(key);
    return this.cache[key];
  }
  return -1;
};

LRUCache.prototype.set = function (key, value) {
  if (this.cache[key]) {
    const index = this.keys.indexOf(key);
    this.keys.splice(index, 1);
    this.keys.push(key);
    this.cache[key] = value;
  } else {
    if (this.keys.length >= this.max) {
      delete this.cache[this.keys.splice(0, 1)];
    }
    this.cache[key] = value;
    this.keys.push(key);
  }
};
