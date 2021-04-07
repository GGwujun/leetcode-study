/**
 * 打平多位数组
 */

const flatten = function (array) {
  return [].concat(
    ...array.map((item) => (Array.isArray(item) ? flatten(item) : [item]))
  );
};

const flatten2 = function (array) {
  while (array.some((item) => Array.isArray(item))) {
    array = [].concat(...array);
  }
  return array;
};

console.log(123, flatten2([[1, 8], 4, [2, 7]]));
