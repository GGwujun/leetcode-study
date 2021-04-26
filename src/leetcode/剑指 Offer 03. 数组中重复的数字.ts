/**
 *找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

示例 1：

输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 
 *
 * https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/solution/mian-shi-ti-03-shu-zu-zhong-zhong-fu-de-shu-zi-yua/
 */

/**
 * 遍历，采用hash缓存
 */

/**
 * 原地替换
 */

// [2, 3, 1, 0, 2, 5, 3];

const findRepeatNumber = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] == i) {
      i++;
      continue;
    }
    if (nums[nums[i]] == nums[i]) return nums[i];
    let tmp = nums[i];
    nums[i] = nums[tmp];
    nums[tmp] = tmp;
  }
  return -1;
};
