/**
 * 给定两个字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。

示例 1：

输入: s1 = "abc", s2 = "bca"
输出: true 
示例 2：

输入: s1 = "abc", s2 = "bad"
输出: false


 */

/**
 * 这种方式的时间复杂度其实是O(n2)，我们也可以用map存储，则就是O(n)
 * @param s1
 * @param s2
 */

var CheckPermutation = function (s1: string, s2: string) {
  if (s1.length !== s2.length) return false;
  let s2Arr = s2.split("");
  let i = 0;
  while (i < s1.length) {
    if (s2Arr.length === 0) return false;
    let cur = s1[i];
    //@ts-ignore
    let curIndex = s2Arr.indexOf(cur);
    if (curIndex > -1) {
      s2Arr.splice(curIndex, 1);
    }
    i++;
  }
  return !s2Arr.length;
};
