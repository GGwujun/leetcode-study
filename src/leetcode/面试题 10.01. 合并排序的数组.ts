/**
 * 给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B。 编写一个方法，将 B 合并入 A 并排序。

初始化 A 和 B 的元素数量分别为 m 和 n。

示例:

输入:
A = [1,2,3,0,0,0], m = 3
B = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

 */

/**
 * 第一种就是暴力法，直接把b数组放到a数组，然后排序
 */

var merge = function (A, m, B, n) {
  A.splice(m, m - A.length, ...B);
  return A.sort((a, b) => a - b);
};

/**
 * 正向双指针，利用一个空数组保留，然后不断移动指针，按序放置元素
 * 这种不是原地
 */

// [1,2,3]
// [2,5,6]

// 0+0 = 0
// 1+0 = 1
// 2 + 0 = 2
// 2+1 = 3
// 3+1 = 4
// 3+2 = 5
// 3+3  结束循环

var merge2 = function (A, m, B, n) {
  const result = [];
  let p1 = 0,
    p2 = 0,
    cur;
  while (p1 < m || p2 < n) {
    const cur1 = A[p1];
    const cur2 = B[p2];
    if (p1 === m) {
      cur = B[p2++];
    } else if (p2 === n || cur1 <= cur2) {
      cur = A[p1++];
    } else {
      cur = A[p1++];
    }
    result[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i < m + n; i++) {
    A[i] = result[i];
  }
};

/**
 * 双指针，逆向遍历，就不需要一个临时变量存储
 */

// [1,2,3]
// [2,5,6]

// 2 + 2  == [1,2,3,,,6]  tail = 5
// 2 + 1  == [1,2,3,,5,6]  tail = 4
// 2 + 0  == [1,2,3,3,5,6]  tail = 3
// 1 + 0  == [1,2,2,3,5,6]  tail = 2
// 0 + 0  == [1,2,2,3,5,6]  tail = 1
// 0 + -1  == [1,2,2,3,5,6]  tail = 0
// -1 + -1  == [1,2,2,3,5,6]  结束循环

var merge3 = function (A, m, B, n) {
  let p1 = m - 1,
    p2 = n - 1,
    cur;
  let tail = m + n - 1;
  while (p1 >= 0 || p2 >= 0) {
    const cur1 = A[p1];
    const cur2 = B[p2];
    if (p1 === -1) {
      cur = B[p2--];
    } else if (p2 === -1) {
      cur = A[p1--];
    } else if (cur1 >= cur2) {
      cur = A[p1--];
    } else {
      cur = B[p2--];
    }
    A[tail--] = cur;
  }
};
