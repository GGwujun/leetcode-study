/**
 * Graph通常有两种表达方式：
 * Adjaceny List（邻接列表）：邻接列表可以表示为左侧是节点的列表，右侧列出它所连接的所有其他节点
 * Adjacency Matrix（邻接矩阵）:c邻接矩阵用矩阵来表示节点之间的连接关系，每行或者每列表示一个节点，行和列的交叉处的数字表示节点之间的关系：0表示没用连接，1表示有连接，大于1表示不同的权重。
 *
 *
 * 访问Graph中的节点需要使用遍历算法，遍历算法又分为广度优先和深度优先，主要用于确定目标节点和根节点之间的距离，
 * 在Javascript中，Graph可以用一个矩阵（二维数组）表示，广度优先搜索算法可以实现如下：
 *
 * https://www.cnblogs.com/jaxu/p/11338294.html
 */

function bfs(graph, root) {
  var nodesLen = {};
  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  nodesLen[root] = 0;
  var queue = [root];
  var current;
  while (queue.length != 0) {
    current = queue.shift();

    var curConnected = graph[current];
    var neighborIdx = [];
    var idx = curConnected.indexOf(1);
    while (idx != -1) {
      neighborIdx.push(idx);
      idx = curConnected.indexOf(1, idx + 1);
    }

    for (var j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] == Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }

  return nodesLen;
}

var graph = [
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
];

console.log(bfs(graph, 1));
