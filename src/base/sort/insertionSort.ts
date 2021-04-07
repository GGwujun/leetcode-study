/**
 * 插入排序，一般分为直接插入排序，拆半插入排序，希尔排序。本篇讲解的是直接插入排序
 * 类比打扑克牌，每次拿到新的牌就看一遍手里所有的牌，把这张牌查到合适的位置
 * 同构构建有序序列，把未排序的数据从已排序序列中从后往前扫描，插入到合适的位置
 * 步骤

从第一个元素开始，该元素可以认为已经被排序；
取出下一个元素，在已经排序的元素序列中从后向前扫描；
如果该元素（已排序）大于新元素，将该元素移到下一位置；
重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
将新元素插入到该位置后；
重复步骤 2~5。

 */

const insertionSort = (array) => {
  let len = array.length;
  if (len <= 1) return array;
  let sorted = [];
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = array[i];
    while (preIndex >= 0 && array[preIndex] > current) {
      //前置条件之一: 待比较元素比当前元素大
      array[preIndex + 1] = array[preIndex]; //将待比较元素后移一位
      preIndex--; //游标前移一位
    }
    if (preIndex + 1 != i) {
      //避免同一个元素赋值给自身
      array[preIndex + 1] = current; //将当前元素插入预留空位
      console.log("array :", array);
    }
  }
  return array;
};

/**
 * 折半插入排序
 * 既然前半部分的数据已经排好序了，那么我们就不需要一个一个的比较，我们取中间元素进行比较
 * 步骤

取 0 ~ i-1 的中间点 ( m = (i-1)>>1 )，array[i] 与 array[m] 进行比较，若 array[i] < array[m]，则说明待插入的元素 array[i] 应该处于数组的 0 ~ m 索引之间；反之，则说明它应该处于数组的 m ~ i-1 索引之间。
重复步骤 1，每次缩小一半的查找范围，直至找到插入的位置。
将数组中插入位置之后的元素全部后移一位。
在指定位置插入第 i 个元素。
注：x>>1 是位运算中的右移运算，表示右移一位，等同于 x 除以 2 再取整，即 x>>1 == Math.floor(x/2) 。
 */

const binaryInsertionSort = (array) => {
  let len = array.length;
  if (len <= 1) return array;
  let current, i, j, low, high, m;
  for (i = 1; i < len; i++) {
    low = 0;
    high = i - 1;
    current = array[i];

    while (low <= high) {
      //步骤 1 & 2 : 折半查找
      m = (low + high) >> 1; // 注: x>>1 是位运算中的右移运算, 表示右移一位, 等同于 x 除以 2 再取整, 即 x>>1 == Math.floor(x/2) .
      if (array[i] >= array[m]) {
        //值相同时, 切换到高半区，保证稳定性
        low = m + 1; //插入点在高半区
      } else {
        high = m - 1; //插入点在低半区
      }
    }
    for (j = i; j > low; j--) {
      //步骤 3: 插入位置之后的元素全部后移一位
      array[j] = array[j - 1];
      console.log("array2 :", JSON.parse(JSON.stringify(array)));
    }
    array[low] = current; //步骤 4: 插入该元素
  }
  console.log("array2 :", JSON.parse(JSON.stringify(array)));
  return array;
};
