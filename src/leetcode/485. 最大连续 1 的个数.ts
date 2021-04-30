/**
 * 给定一个二进制数组， 计算其中最大连续 1 的个数。

 

示例：

输入：[1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-consecutive-ones
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let maxCount = 0,
    count = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      count++;
    } else {
      maxCount = Math.max(maxCount, count);
      count = 0;
    }
  }
  maxCount = Math.max(maxCount, count);
  return maxCount;
};

/**
 * 
 * 滑动窗口
链接：https://leetcode-cn.com/problems/max-consecutive-ones/solution/cchao-guo-98de-hua-dong-chuang-kou-jie-f-3wl0/
 * @param nums 
 */

const findMaxConsecutiveOnes2 = function (nums) {
  // 记录最大连续1的个数
  let res = 0;
  // 窗口的左边
  let l = 0;
  // 窗口的右边
  let r = 0;
  let n = nums.length;
  // 循环条件是 r < n
  while (r < n) {
    if (nums[r] == 1) {
      // 满足，则不断扩大r
      ++r;
    } else {
      // 不满足，则累加 r 和 l 更新为r
      res = Math.max(res, r - l);
      ++r;
      l = r;
    }
  }
  res = Math.max(res, r - l);
  return res;
};
