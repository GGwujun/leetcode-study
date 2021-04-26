/**
 * 统计一个数字在排序数组中出现的次数。

 

示例 1:

输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
示例 2:

输入: nums = [5,7,7,8,8,10], target = 6
输出: 0


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/solution/mian-shi-ti-53-i-zai-pai-xu-shu-zu-zhong-cha-zha-5/
 */

/**
 * 二分法查找左右节点
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;
  let left = 0,
    right = 0;
  let mid;
  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (nums[mid] === target) {
      if (mid === 0 || nums[mid - 1] !== target) {
        left = mid - 1;
        break;
      } else {
        high = mid - 1;
      }
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  low = left + 1;
  high = nums.length - 1;

  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (nums[mid] === target) {
      if (mid === nums.length - 1 || nums[mid + 1] !== target) {
        right = mid;
        break;
      } else {
        low = mid + 1;
      }
    } else if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return right - left;
};
