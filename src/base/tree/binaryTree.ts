/**
 * 树在前端中的应用很多，比如dom树结构，虚拟dom树，diff算法也是依赖语树，级联选择器等
 * 树一般会分为二叉树，三叉树，四叉树等，最常用的就是二叉树
 *
 * 二叉树
 * 
 * 
 * 1. 链式存储法
链式存储法，是通过指针的方式来记录父子关系的一种方法。它有点类似链表，每个节点除了保存自身的数据外，还会有left 和 right 两个指针，指向另外两个节点。
const node = {
    data: 1,         // 节点保存的数据
    left: node2,    // 左子节点指向 node2 节点
    right: null     // null 表示没有右子节点
}
复制代码2. 顺序存储法
用数组存储。为了代码可读性更好，我们一般会选择浪费数组下标为 0 的存储位置，即根节点在下标为 1 的位置。 这时父节点和左右节点的下标关系如下：
left = 2 * i;
right = 2 * i + 1;
i = left / 2;   
i = right / 2;  // 这里是向下取整
复制代码这里的 i 为父节点下标，left 和 right 为两个子节点下标。

 */

// 节点构造函数
export function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * 链式存储法
 * 完全二叉树，因为一般的二叉树没法生成
 */
export class BinaryTree {
  root: Node;
  constructor() {
    this.root = null;
  }
  // 生成完全二叉树。(可以看成是二叉树数组表示法转化为链表表示法)
  init(array) {
    if (array.length == 0) return;
    let nodeArray = [null];
    array.forEach((val) => {
      nodeArray.push(new Node(val));
    });
    this.root = nodeArray[1];
    // 生成完全二叉树。
    let left, right;
    for (let i = 1; i < nodeArray.length; i++) {
      left = nodeArray[i * 2];
      if (!left) break; // 说明 i * 2 == nodeArray.length

      right = nodeArray[i * 2 + 1];
      nodeArray[i].left = left;
      nodeArray[i].right = right;
    }
  }
  // 前序遍历
  preOrder() {
    // 递归函数
    function r(node) {
      if (!node) return;
      order += `${node.val},`;
      r(node.left);
      r(node.right);
    }
    let order = "";
    r(this.root);
    order = order.slice(0, order.length - 1);
    return order;
  }
  // 中序遍历
  inOrder() {
    // 递归函数
    function r(node) {
      if (!node) return;
      r(node.left);
      order += `${node.val},`;
      r(node.right);
    }
    let order = "";
    r(this.root);
    order = order.slice(0, order.length - 1);
    return order;
  }
  //后序遍历
  postOrder() {
    // 递归函数
    function r(node) {
      if (!node) return;
      r(node.left);
      r(node.right);
      order += `${node.val},`;
    }
    let order = "";
    r(this.root);
    order = order.slice(0, order.length - 1);
    return order;
  }
  // 层序遍历
  levelOrder() {
    if (this.root == null) return "";
    let a = [],
      left,
      right;
    a.push(this.root);

    // 节点入队，指针指向头部元素，如果它有left/right，入队。
    // 指针后移，继续同样步骤。。。直至指针跑到队列尾部后面去。。。
    for (let i = 0; i < a.length; i++) {
      // 需要注意的是，数组 a 的长度是动态变化的（不停变长）
      left = a[i].left;
      if (left) a.push(left);

      right = a[i].right;
      if (right) a.push(right);
    }
    return a.map((item) => item.val).join(",");
  }
}
