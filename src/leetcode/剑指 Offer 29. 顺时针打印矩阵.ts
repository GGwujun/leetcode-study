/**
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

 

示例 1：

输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
示例 2：

输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 *
 * 类似于剥洋葱的有限状态机，思路清晰易懂。
 * https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/lei-si-yu-bo-yang-cong-de-you-xian-zhuan-avvr/
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {};

/**
 * 可以模拟打印矩阵的路径。初始位置是矩阵的左上角，初始方向是向右，当路径超出界限或者进入之前访问过的位置时，顺时针旋转，进入下一个方向。

判断路径是否进入之前访问过的位置需要使用一个与输入矩阵大小相同的辅助矩阵 \textit{visited}visited，其中的每个元素表示该位置是否被访问过。当一个元素被访问时，将 \textit{visited}visited 中的对应位置的元素设为已访问。

如何判断路径是否结束？由于矩阵中的每个元素都被访问一次，因此路径的长度即为矩阵中的元素数量，当路径的长度达到矩阵中的元素数量时即为完整路径，将该路径返回。

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/shun-shi-zhen-da-yin-ju-zhen-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */

var spiralOrder2 = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  const rows = matrix.length,
    columns = matrix[0].length;
  const visited = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(false));
  const total = rows * columns;
  const order = new Array(total).fill(0);
  let directionIndex = 0,
    row = 0,
    column = 0;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (let i = 0; i < total; i++) {
    order[i] = matrix[row][column];
    visited[row][column] = true;
    const nextRow = row + directions[directionIndex][0],
      nextColumn = column + directions[directionIndex][1];
    // 改变方向
    // 初始方向是向右，当路径超出界限或者进入之前访问过的位置时，顺时针旋转，进入下一个方向
    if (
      !(
        0 <= nextRow &&
        nextRow < rows &&
        0 <= nextColumn &&
        nextColumn < columns &&
        !visited[nextRow][nextColumn]
      )
    ) {
      directionIndex = (directionIndex + 1) % 4;
    }
    // 切换到下一行和列
    row += directions[directionIndex][0];
    column += directions[directionIndex][1];
  }
  return order;
};

/**
 * 按层模拟
 */

var spiralOrder3 = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const rows = matrix.length,
    columns = matrix[0].length;
  const order = [];
  let left = 0,
    right = columns - 1,
    top = 0,
    bottom = rows - 1;
  while (left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }
    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }
  return order;
};
