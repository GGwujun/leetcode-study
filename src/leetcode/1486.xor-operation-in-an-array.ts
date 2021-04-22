/**
 * 异或操作
 * https://leetcode-cn.com/problems/xor-operation-in-an-array/solution/o1wei-yun-suan-xiang-xi-yi-dong-ban-by-gbl/
 */

/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */

function helper(n, start) {
  if (n % 2 === 0) return Math.floor(n / 2) & 1;
  else return (Math.floor(n / 2) & 1) ^ (start + n - 1);
}

function xor(n, start) {
  if (start & 1) return (start - 1) ^ helper(n + 1, start - 1);
  else return helper(n, start);
}

var xorOperation = function (n, start) {
  let res = 2 * xor(n, Math.floor(start / 2));
  if (n & start & 1) res++;
  return res;
};

console.log(xorOperation(1, 7));
