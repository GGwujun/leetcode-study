/**
 * https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
 * https://leetcode-cn.com/problems/reverse-linked-list/
 * 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 

限制：

0 <= 节点个数 <= 5000

 

注意：本题与主站 206 题相同：https://leetcode-cn.com/problems/reverse-linked-list/


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
var reverseLinkedList = function (head) {
  let cur = head;
  let pre = null;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseLinkedList = function (head) {
  const reverse = (pre, cur) => {
    if (!cur) return pre;
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
  };
  return reverse(null, head);
};
