/**
 * 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

找到所有在 [1, n] 范围之间没有出现在数组中的数字。

您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

示例:

输入:
[4,3,2,7,8,2,3,1]

输出:
[5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 如果不要求空间复杂度O(1)，则可以使用map记录每一个数字的出现次数，然后遍历一遍1-n，看那个没有出现过
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const tempMap = {};
  const result = [];
  nums.forEach((num) => {
    if (tempMap[num]) tempMap[num] += 1;
    else tempMap[num] = 1;
  });

  for (let i = 1; i <= nums.length; i++) {
    if (!tempMap[i]) {
      result.push(i);
    }
  }
  return result;
};

/**
 * 可以利用nums原地标记
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers2 = function (nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[Math.abs(nums[i]) - 1] > 0) {
      nums[Math.abs(nums[i]) - 1] *= -1;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
};
