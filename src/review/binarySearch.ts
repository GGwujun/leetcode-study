/**
 * 二分查找，对数组这种有序的连续数据结构，需要在数据中查找满足条件的元素
 */

/**
 * 查找等于某一个target
 */

// 迭代
const binarySearch1_1 = function (array, target) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (array[mid] === target) return mid;
    if (array[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

// 递归
const binarySearch1_2 = function (array, target) {
  const search = function (array, low, high, target) {
    if (low > high) return -1;
    let mid = low + ((high - low) >> 1);
    if (array[mid] === target) return mid;
    if (array[mid] > target) {
      return search(array, low, mid - 1, target);
    } else {
      return search(array, mid + 1, high, target);
    }
  };
  return search(array, 0, array.length - 1, target);
};

/**
 * 查找第一个等于某一个值，这时候数组可能就有重复元素，采用上面的查找方法就可能找到不的不是第一个
 */

const binarySearch2_1 = function (array, target) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (array[mid] === target) {
      if (mid === 0 || array[mid - 1] !== target) return mid;
      else high = mid - 1;
    } else if (array[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

/**
 * 查找第一个大于等于某一个值，这时候数组可能就有重复元素，采用上面的查找方法就可能找到不的不是第一个
 */

const binarySearch3_1 = function (array, target) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (array[mid] >= target) {
      if (mid === 0 || array[mid - 1] < target) return mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

/**
 * 查找最后一个等于某一个值，这时候数组可能就有重复元素，采用上面的查找方法就可能找到不的不是第一个
 */

const binarySearch4_1 = function (array, target) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (array[mid] === target) {
      if (mid === array.length - 1 || array[mid + 1] !== target) return mid;
      else low = mid + 1;
    } else if (array[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

/**
 * 查找最后一个小于等于某一个值，这时候数组可能就有重复元素，采用上面的查找方法就可能找到不的不是第一个
 */

const binarySearch5_1 = function (array, target) {
  let low = 0,
    high = array.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (array[mid] >= target) {
      high = mid - 1;
    } else {
      if (mid === array.length - 1 || array[mid + 1] > target) return mid;
      low = mid + 1;
    }
  }
  return -1;
};
