/**
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * 
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

 */

import { preProcessFile } from "typescript";

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 递归法
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

/**
 * 穿针引线法
 * pre指针来回串起来排好序的节点
 * @param l1
 * @param l2
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  let mergeResult = l1.val <= l2.val ? l1 : l2;
  let cur1 = mergeResult ? l1 : l2;
  let cur2 = mergeResult ? l2 : l1;
  let pre = null;
  let next = null;
  while (cur1 && cur2) {
    if (cur1.val <= cur2.val) {
      next = cur1.next;
      if (!pre) {
        pre = cur1;
      } else {
        pre.next = cur1;
        cur1.next = cur2;
        pre = cur1;
      }
      cur1 = next;
    } else {
      next = cur2.next;
      if (!pre) {
        pre = cur2;
      } else {
        pre.next = cur2;
        cur2.next = cur1;
        pre = cur2;
      }
      cur2 = next;
    }
  }
  pre.next = cur1 ? cur1 : cur2;
  return mergeResult;
};

/**
 * 迭代法
 * @param l1
 * @param l2
 */
var mergeTwoLists = function (l1, l2) {
  let preHead = { next: null, val: -1 };
  let pre = preHead;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      pre.next = l1;
      l1 = l1.next;
    } else {
      pre.next = l2;
      l2 = l2.next;
    }
    pre = pre.next;
  }
  pre.next = l1 ? l1 : l2;
  return preHead.next;
};
