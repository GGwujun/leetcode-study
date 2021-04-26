/**
 * 魔术索引。 在数组A[0...n-1]中，有所谓的魔术索引，满足条件A[i] = i。给定一个有序整数数组，编写一种方法找出魔术索引，若有的话，在数组A中找出一个魔术索引，如果没有，则返回-1。若有多个魔术索引，返回索引值最小的一个。

示例1:

 输入：nums = [0, 2, 3, 4, 5]
 输出：0
 说明: 0下标的元素为0
示例2:

 输入：nums = [1, 1, 1]
 输出：1
说明:

nums长度在[1, 1000000]之间
此题为原书中的 Follow-up，即数组中可能包含重复元素的版本

 */

/**
 * 直接利用数组方法执行，其实也是暴力法
 * @param nums
 */

var findMagicIndex = function (nums) {
  return nums.findIndex((num, index) => num === index);
};

var findMagicIndex3 = function (nums) {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === i) {
      return i;
    } else if (nums[i] > i) {
      i = nums[i];
    } else {
      i += 1;
    }
  }
  return -1;
};

/**
 * 二分法，仔细研究下面的二分，在对于重复的数据时候就不可行了
 */

var findMagicIndex2 = function (nums) {
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (nums[mid] === mid) {
      if (mid === 0 || nums[mid - 1] !== mid - 1) return mid;
      else high = mid - 1;
    }
    if (nums[mid] > mid) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};
