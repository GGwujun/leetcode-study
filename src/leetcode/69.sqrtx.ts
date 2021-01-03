/*
https://leetcode-cn.com/problems/sqrtx/

实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2
示例 2:

输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。


8如果要求接平方根，那么就需要遍历，找到一个数的平方等于8

*/

/**
 * 暴力解法
 * @param x
 */
var mySqrt = function (x) {
  var i = 1;
  while (x >= i * i) {
    i++;
  }
  return i - 1;
};

/**
 * es6
 * @param x
 */
var mySqrt2 = function (x) {
  return Math.floor(x ** 0.5); //向下取整 x^0.5
};

/**
 * 二分解法
 * 0-x这个区间进行二分查找，第一次去中间值mid
 * @param x
 */
var mySqrt3 = function (x) {
  if (x == 1) return 1;
  let min = 0;
  let max = x;
  let result = -1;

  while (min <= max) {
    let mid = (max + min) / 2;
    if (mid * mid <= x) {
      min = mid + 1;
      result = mid;
    } else max = mid - 1;
  }
  return result;
};

console.log(mySqrt3(9));
