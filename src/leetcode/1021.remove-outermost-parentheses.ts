/**
 * https://leetcode-cn.com/problems/remove-outermost-parentheses/
 * 
 * 有效括号字符串为空 ("")、"(" + A + ")" 或 A + B，其中 A 和 B 都是有效的括号字符串，+ 代表字符串的连接。例如，""，"()"，"(())()" 和 "(()(()))" 都是有效的括号字符串。

如果有效字符串 S 非空，且不存在将其拆分为 S = A+B 的方法，我们称其为原语（primitive），其中 A 和 B 都是非空有效括号字符串。

给出一个非空有效字符串 S，考虑将其进行原语化分解，使得：S = P_1 + P_2 + ... + P_k，其中 P_i 是有效括号字符串原语。

对 S 进行原语化分解，删除分解中每个原语字符串的最外层括号，返回 S 。

 

示例 1：

输入："(()())(())"
输出："()()()"
解释：
输入字符串为 "(()())(())"，原语化分解得到 "(()())" + "(())"，
删除每个部分中的最外层括号后得到 "()()" + "()" = "()()()"。
示例 2：

输入："(()())(())(()(()))"
输出："()()()()(())"
解释：
输入字符串为 "(()())(())(()(()))"，原语化分解得到 "(()())" + "(())" + "(()(()))"，
删除每个部分中的最外层括号后得到 "()()" + "()" + "()(())" = "()()()()(())"。
示例 3：

输入："()()"
输出：""
解释：
输入字符串为 "()()"，原语化分解得到 "()" + "()"，
删除每个部分中的最外层括号后得到 "" + "" = ""。
 

提示：

S.length <= 10000
S[i] 为 "(" 或 ")"
S 是一个有效括号字符串

 */

/**
 * 利用双指针法，利用两个指针找到左右括号的下标
 * @param S
 */
var removeOuterParentheses = function (S: string) {
  const sArr = S.split("");
  let result = "";
  let left = 0;
  let count = 0;
  sArr.forEach(function (str, index) {
    if (str == "(") {
      count += 1;
    } else if (str == ")") {
      count -= 1;
    }
    if (count == 0) {
      result += sArr.slice(left + 1, index).join("");
      left = index + 1;
    }
  });
  return result;
};

/**
 * 利用单指针法，一遍计算一遍计算结果
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function (S: string) {
  const sArr = S.split("");
  let result = [];
  let count = 0;
  sArr.forEach(function (str) {
    if (str == "(") {
      if (count > 0) result.push(str);
      count += 1;
    } else if (str == ")") {
      if (count > 1) result.push(str);
      count -= 1;
    }
  });
  return result.join("");
};

/**
 * 利用栈这种数据结构处理
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function (S: string) {
  const sArr = S.split("");
  const stack = [];
  let result = "";
  sArr.forEach(function (str) {
    if (str == "(") {
      if (stack.length) {
        result += str;
      }
      stack.push(str);
    } else if (str == ")") {
      stack.pop();
      if (stack.length) {
        result += str;
      }
    }
  });
  return result;
};
