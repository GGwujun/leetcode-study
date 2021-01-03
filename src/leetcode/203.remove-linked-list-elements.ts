/**
 * https://leetcode-cn.com/problems/remove-linked-list-elements/
 * 
 * 删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 利用哨兵解决头节点删除问题
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let sentinel = { next: head, val: -1 };
  let cur = head;
  let pre = sentinel;

  // 1-2-3-4
  while (cur) {
    let next = cur.next;
    if (cur.val == val) {
      pre.next = next;
    } else {
      pre = cur;
    }
    cur = next;
  }
  return sentinel.next;
};

/**
 * 不利用哨兵解决，那就需要单独处理头部节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  while (head != null && head.val == val) {
    head = head.next;
  }
  if (head == null) return head;
  let cur = head;
  while (cur.next) {
    let next = cur.next;
    if (next.val == val) {
      cur.next = next.next;
    } else {
      cur = next;
    }
  }
  return cur;
};

/**
 * 利用递归法
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (head == null) return null;
  head.next = removeElements(head.next, val);
  if (head.val == val) {
    return head.next;
  } else {
    return head;
  }
};
