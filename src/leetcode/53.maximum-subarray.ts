/*
https://leetcode-cn.com/problems/maximum-subarray/

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

*/

/**
 * 动态算法：
 * 循环数组，把数组每一项求和，当前值比之前的和比大小，如果当前值小于之前和，则求和，否则丢弃之前的和
 * 最大值每次比较
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let cur_sum = 0;
  let max_sum = nums[0];
  nums.forEach((value) => {
    cur_sum = Math.max(value, cur_sum + value);
    max_sum = Math.max(cur_sum, max_sum);
  });
  return max_sum;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/**
 * 贪心：
 * 循环数组，把每一项求和，在求和的过程中判断前一个元素如果小于0则丢弃，大于0则求和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray2 = function (nums) {
  var max = nums[0];
  var sum = 0;
  for (let num of nums) {
    if (sum < 0) {
      sum = 0;
    }
    sum += num;
    max = Math.max(sum, max);
  }
  return max;
};

console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
