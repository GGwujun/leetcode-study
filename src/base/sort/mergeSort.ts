"use strict";

function merge(left, right) {
  var result = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}

function mergeSort2(items) {
  if (items.length == 1) {
    return items;
  }
  var half = Math.floor(items.length / 2),
    left = items.slice(0, half),
    right = items.slice(half);
  return merge(mergeSort2(left), mergeSort2(right));
}

function mergeSort(items) {
  var len = items.length;
  if (len == 1) {
    return items;
  }
  var result = [];
  for (var i = 0; i < len; i++) {
    result.push([items[i]]);
  }
  if (len % 2) {
    result.push([]);
  }

  var lim = result.length / 2;
  while (lim > 1) {
    for (var j = 0, k = 0; j < lim; j++, k = k + 2) {
      result[j] = merge(result[k], k + 1 < lim * 2 ? result[k + 1] : []);
    }
    lim = lim / 2;
  }
  return merge(result[0], result[1]);
}

// console.log(999, mergeSort([1, 7, 4, 2, 7, 3, 9, 2, 8, 4, 9]));

// 递归实现
const Fibonacci = function (n) {
  console.log(1);
  if (n === 1 || n === 2) return 1;

  return Fibonacci(n - 1) + Fibonacci(n - 2);
};

console.log(Fibonacci(5));

//尾递归优化
const Fibonacci2 = function (n, n1, n2) {
  console.log(3);
  if (n === 0) return n1;
  return Fibonacci2(n - 1, n2, n1 + n2);
};

console.log(Fibonacci2(5, 0, 1));

//利用缓存
const Fibonacci3 = (() => {
  var memo = [0, 1];
  const fib = (n) => {
    console.log(2);
    let result = memo[n];
    if (typeof result !== "number") {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})();
console.log(Fibonacci3(5));

//迭代
var fibonacci = function (n) {
  var a = [0, 1]; //记录数列的数组，第1、2个元素值确定
  for (var i = 2; i <= n; i++) {
    //从第 3 个数字开始循环
    a.push(a[i - 2] + a[i - 1]); //计算新数字，并推入数组
  }
  return a[n]; //返回指定位数的数列结果
};
console.log(fibonacci(5));
