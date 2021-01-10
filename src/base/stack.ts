/**
 * 栈，最显著的特点是先进后出，后进先出，属于线性数据结构
 * 新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端就叫栈底
 * 在栈里，新元素都靠近栈顶，旧元素都接近栈底
 * 从栈的操作特性来看，是一种 操作受限的线性表，只允许在一端插入和删除数据。
 * 不包含任何元素的栈称为空栈
 * 利用数组模拟栈
 *
 *
 * 也可以用对象实现，以插入数据的索引作为key
 */

class Stack {
  items: any[] = [];
  push(data) {
    this.items.push(data);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    return (this.items = []);
  }
  size() {
    return this.items.length;
  }
  print() {
    console.log("print===", this.items.toString());
  }
}

// 创建Stack实例
var stack = new Stack();
console.log(stack.isEmpty()); // true
stack.push(5); // undefined
stack.push(8); // undefined
console.log(stack.peek()); // 8
stack.push(11); // undefined
console.log(stack.size()); // 3
console.log(stack.isEmpty()); // false
stack.push(15); // undefined
stack.pop(); // 15
console.log(stack.size()); // 3
stack.print(); // 5,8,11
stack.clear(); // undefined
console.log(stack.size()); // 0
