/**
 * 冒泡排序
 * 冒泡排序只会操作相邻的两个数据
 * 每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换
 * 一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作，这里的一次冒泡其实是循环一遍整个数组
 * 时间复杂度：
 *      最差：O(n^2)
 *      最好：O(n)
 *      平均：O(n^2)
 * 空间复杂度：O(1)
 */

var dubbleSort = function (array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 1; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let tmpa = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmpa;
      }
    }
  }
};

/**
 * 如果某一次没有发生一次数据交换说明数据已经有序，所以不要再排序了
 * @param array
 */
var dubbleSort2 = function (array) {
  for (let i = 0; i < array.length - 1; i++) {
    let hasChange = false;
    for (let j = 1; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let tmpa = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmpa;
        hasChange = true;
      }
    }
    if (!hasChange) break;
  }
};
