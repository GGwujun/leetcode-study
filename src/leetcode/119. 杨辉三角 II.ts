/**
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。



在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 3
输出: [1,3,3,1]
进阶：

你可以优化你的算法到 O(k) 空间复杂度吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/pascals-triangle-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * https://leetcode-cn.com/problems/pascals-triangle-ii/solution/yang-hui-san-jiao-ii-by-leetcode-solutio-shuk/
 */

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const C = [];
  for (let i = 0; i <= rowIndex; i++) {
    C[i] = [];
    C[i][0] = C[i][i] = 1;
    for (let j = 1; j < i; j++) {
      C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
  }
  return C[rowIndex];
};

/**
 * 我们只需要前一行数据，所以只存储上一行即可
 * @param rowIndex
 */
var getRow2 = function (rowIndex) {
  let pre = [],
    cur = [];
  for (let i = 0; i <= rowIndex; ++i) {
    cur = new Array(i + 1).fill(0);
    cur[0] = cur[i] = 1;
    for (let j = 1; j < i; ++j) {
      cur[j] = pre[j - 1] + pre[j];
    }
    pre = cur;
  }
  return pre;
};
