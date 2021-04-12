/**
 * 通过一趟排序把待排序记录分为两部分，一部分比point小，一部分比point大。然后继续对这两部分进行排序
 */

export const quickSort = function (array, left, right) {
  if (left < right) {
    let point = array[right];
    let i = left - 1;
    for (let j = left; j <= right; j++) {
      if (array[j] <= point) {
        i++;
        [array[j], array[i]] = [array[i], array[j]];
      }
    }
    quickSort(array, left, i - 1);
    quickSort(array, i + 1, right);
  }
  return array;
};

export const quickSort2 = function (array: any[]): any[] {
  if (array.length <= 1) return array;
  let pointIndex = array.length >> 1;
  let point = array.splice(pointIndex, 1);
  let left = [],
    right = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] < point) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quickSort2(left).concat([point], quickSort2(right));
};
