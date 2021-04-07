/**
 * 树的遍历，分为两种：dfs和bfs
 * 深度优先搜索是用栈来实现，至于栈是递归栈还是自己模拟栈都可以
 * 广度优先搜索使用队列实现，说只能自己模拟队列
 */

const Traversal = function (root) {
  let nodes = [];
  if (root) {
    nodes.push(root);
    root.children.forEach((child) => {
      nodes = nodes.concat(Traversal(child));
    });
  }
  return nodes;
};

const Traversal2 = function (root, nodes = []) {
  if (root) {
    nodes.push(root);
    root.children.forEach((child) => {
      Traversal2(child, nodes);
    });
  }
  return nodes;
};

const Traversal3 = function (root) {
  let stack = [root];
  let nodes = [];
  if (root) {
    while (stack.length) {
      let cur = stack.pop();
      nodes.push(cur);
      cur.children.forEach((child) => {
        stack.push(child);
      });
    }
  }
  return nodes;
};

const widthTraversal2 = function (root) {
  let nodes = [];
  let queue = [root];
  if (root) {
    while (queue.length) {
      let cur = queue.shift();
      nodes.push(cur);
      cur.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  return nodes;
};
