"use strict";

function merge(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}

/**
 * 递归写法
 * @param items
 */
export function mergeSort(items) {
  if (items.length == 1) {
    return items;
  }
  var half = items.length >> 1,
    left = items.slice(0, half),
    right = items.slice(half);
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 迭代写法
 * @param items
 */
export function mergeSort2(items) {
  console.time("归并排序2耗时");
  var len = items.length;
  if (len == 1) {
    return items;
  }
  var result = [];
  for (var i = 0; i < len; i++) {
    result.push([items[i]]);
  }
  if (len % 2) {
    result.push([]);
  }

  var lim = result.length / 2;
  while (lim > 1) {
    for (var j = 0, k = 0; j < lim; j++, k = k + 2) {
      result[j] = merge(result[k], k + 1 < lim * 2 ? result[k + 1] : []);
    }
    lim = lim / 2;
  }
  const res = merge(result[0], result[1]);
  console.timeEnd("归并排序2耗时");
  return res;
}
