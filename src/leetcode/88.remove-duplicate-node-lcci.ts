/**
 * https://leetcode-cn.com/problems/remove-duplicate-node-lcci/
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
 * 
 * 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

示例1:

 输入：[1, 2, 3, 3, 2, 1]
 输出：[1, 2, 3]
示例2:

 输入：[1, 1, 1, 1, 2]
 输出：[1, 2]
提示：

链表长度在[0, 20000]范围内。
链表元素在[0, 20000]范围内。
进阶：

如果不得使用临时缓冲区，该怎么解决？

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function (head) {
  if (head == null) return null;
  const hash = new Set();
  let cur = head;
  let pre = null;
  while (cur) {
    let next = cur.next;
    if (hash.has(cur.val)) {
      pre.next = next; // 这里匹配到重复节点，则需要从中删除
    } else {
      hash.add(cur.val);
      if (!pre) {
        pre = cur; // 这个里就是head节点，有后续所有节点
      } else {
        pre = pre.next;
      }
    }
    cur = next;
  }
  return head;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeDuplicateNodes = function (head) {
  if (head == null) return null;
  let cur = head;
  while (cur) {
    let q = cur;
    while (q.next) {
      if (cur.val == q.next.val) {
        q.next = q.next.next;
      } else {
        q = q.next;
      }
    }
    cur = cur.next;
  }
  return head;
};
