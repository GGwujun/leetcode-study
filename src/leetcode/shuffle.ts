/**
 * 洗牌算法，数组乱序
 */
const shuffle = function (arr) {
  let m = arr.length;
  while (m > 1) {
    let index = Math.floor(Math.random() * m--);
    [arr[index], arr[m]] = [arr[m], arr[index]];
  }
  return arr;
};
