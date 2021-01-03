/**
 * 链表的数据结构是一种非连续线性数据结构，在内存中存储是非连续。是通过指针和零碎的内存块串联起来的
 * 每个元素由一个存储元素本身的 节点 和一个指向下一个元素的 引用（也称指针或链接）组成
 * 插入和删除元素效率比较高
 * 主要分为：单向链表，双向链表，循环链表
 *
 * @param head
 */

class LinkNode {
  data: any;
  next: any;
  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

class SingleLinkedList {
  length: number = 0;
  head: LinkNode = null;
  append(data) {
    const node = new LinkNode(data);
    let currentNode = this.head;
    if (this.head === null) {
      this.head = node;
    } else {
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.length++;
  }
  insertNode(position, data) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new LinkNode(data);
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = node;
      node.next = currentNode;
    }
    this.length++;
    return true;
  }
  removeAt(position) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      this.head = currentNode.next;
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
    return true;
  }
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  indexOf(data) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.data === data) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return -1;
  }
  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head.data;
  }
  toString() {
    let currentNode = this.head;
    let stringResult = "";
    while (currentNode) {
      stringResult += "," + currentNode.data;
      currentNode = currentNode.next;
    }
    return stringResult.slice(1);
  }
  print() {
    console.log("print===", this.toString());
  }
  list() {
    console.log("head===", this.head);
    return this.head;
  }
}

// 创建单向链表实例
// var singlyLinked = new SingleLinkedList();
// singlyLinked.append("Tom");
// singlyLinked.append("Peter");
// singlyLinked.append("Paul");
// singlyLinked.print();
// singlyLinked.insertNode(1, "大师兄");
// singlyLinked.print();
// singlyLinked.removeAt(1);
// singlyLinked.print();
// singlyLinked.getHead();
// singlyLinked.list();
// singlyLinked.size();
// singlyLinked.isEmpty();
// singlyLinked.indexOf("Peter");
// singlyLinked.remove("Peter");
// singlyLinked.print();

/**
 * 双向链表
 * @param head
 */

class DoubleLinkNode {
  data: any;
  next: any;
  pre: any;
  constructor(data: any) {
    this.data = data;
    this.next = null;
    this.pre = null;
  }
}

class DoubleLinkedList {
  length: number = 0;
  head: DoubleLinkNode = null;
  tail: DoubleLinkNode = null;
  append(data) {
    const node = new DoubleLinkNode(data);
    let currentNode = this.tail;
    if (currentNode === null) {
      this.head = node;
      this.tail = node;
    } else {
      currentNode.next = node;
      node.pre = currentNode;
      this.tail = node;
    }
    this.length++;
  }
  insertNode(position, data) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new DoubleLinkNode(data);
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      // 1-2-3
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        node.next = currentNode;
        currentNode.pre = node;
        this.head = node;
      }
    } else if (position === this.length) {
      this.append(data);
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      // 1-2  3
      previousNode.next = node;
      node.pre = previousNode;
      node.next = currentNode;
      currentNode.pre = node;
    }
    this.length++;
    return true;
  }
  removeAt(position) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      // 1-2-3
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = currentNode.next;
        this.head.pre = null;
      }
    } else if (position === this.length - 1) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        currentNode = this.tail;
        this.tail = currentNode.pre;
        this.tail.next = null;
      }
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      // 1-2 3
      previousNode.next = currentNode.next;
      currentNode.next.pre = previousNode;
    }
    this.length--;
    return true;
  }
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  indexOf(data) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.data === data) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return -1;
  }
  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head.data;
  }
  toString() {
    let currentNode = this.head;
    let stringResult = "";
    while (currentNode) {
      stringResult += "," + currentNode.data;
      currentNode = currentNode.next;
    }
    return stringResult.slice(1);
  }
  print() {
    console.log("print===", this.toString());
  }
  list() {
    console.log("head===", this.head);
    return this.head;
  }
}

// 创建双向链表实例
// var doubleLinked = new DoubleLinkedList();
// doubleLinked.append("Tom");
// doubleLinked.append("Peter");
// doubleLinked.append("Paul");
// doubleLinked.print();
// doubleLinked.list();
// doubleLinked.insertNode(1, "大师兄");
// doubleLinked.print();
// doubleLinked.removeAt(1);
// doubleLinked.print();
// doubleLinked.getHead();
// doubleLinked.list();
// doubleLinked.size();
// doubleLinked.isEmpty();
// doubleLinked.indexOf("Peter");
// doubleLinked.remove("Peter");
// doubleLinked.print();

class CircularLinkNode {
  data: any;
  next: any;
  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  length: number = 0;
  head: CircularLinkNode = null;
  append(data) {
    const node = new CircularLinkNode(data);
    let currentNode = this.head;
    if (this.head === null) {
      this.head = node;
      node.next = this.head;
    } else {
      while (currentNode.next !== this.head) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
      node.next = this.head;
    }
    this.length++;
  }
  insert(position, data) {
    if (position < 0 || position > this.length) {
      return false;
    }
    let node = new CircularLinkNode(data);
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      this.head = node;
      node.next = this.head;
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = node;
      node.next = currentNode;
    }
    this.length++;
    return true;
  }
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let currentPosition = 0;
    let currentNode = this.head;
    let previousNode = null;
    if (position === 0) {
      this.head = currentNode.next;
    } else {
      while (currentPosition < position) {
        currentPosition++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
    return true;
  }
  remove(data) {
    const index = this.indexOf(data);
    return this.removeAt(index);
  }
  indexOf(data) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode && index < this.length) {
      if (currentNode.data === data) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
    return -1;
  }
  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }
  getHead() {
    return this.head.data;
  }
  toString() {
    let currentNode = this.head;
    let stringResult = "";
    let indexCheck = 0;
    while (currentNode && indexCheck < this.length) {
      stringResult += "," + currentNode.data;
      currentNode = currentNode.next;
      indexCheck++;
    }
    return stringResult.slice(1);
  }
  print() {
    console.log("print===", this.toString());
  }
  list() {
    console.log("head===", this.head);
    return this.head;
  }
}

// 创建单向链表实例
var circularLinked = new CircularLinkedList();
console.log(circularLinked.removeAt(0)); // false
console.log(circularLinked.isEmpty()); // true
circularLinked.append("Tom");
circularLinked.append("Peter");
circularLinked.append("Paul");
circularLinked.print(); // "Tom,Peter,Paul"
circularLinked.insert(0, "Susan");
circularLinked.print(); // "Susan,Tom,Peter,Paul"
circularLinked.insert(1, "Jack");
circularLinked.print(); // "Susan,Jack,Tom,Peter,Paul"
console.log(circularLinked.getHead()); // "Susan"
console.log(circularLinked.isEmpty()); // false
console.log(circularLinked.indexOf("Peter")); // 3
console.log(circularLinked.indexOf("Cris")); // -1
circularLinked.remove("Tom");
circularLinked.removeAt(2);
circularLinked.print(); // "Susan,Jack,Paul"
circularLinked.list(); // 具体控制台

/**
 * 写链表代码是最考验逻辑思维能力的，要熟练链表，只有 多写多练，没有捷径。
 * 因为，链表代码到处都是指针的操作、边界条件的处理，稍有不慎就容易产生 Bug
 * 链表代码写得好坏，可以看出一个人写代码是否够细心，考虑问题是否全面，思维是否缜密
 * @param head
 */

/**
 * 题目一：
 * 反转链表，例如，1>2>3>4>5>null
 * 输出: 5>4>3>2>1>null
 */

// 首先我们把1和2进行交换，2>1>3>4>5
// 然后继续交换1和3 3>2>1 >4>5
// 4>3>2>1>5
// 5>4>3>2>1

const reverseList = function (head) {
  if (!head) return null;
  let pre = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};

const reverseList2 = (head) => {
  const reverse = (pre, cur) => {
    if (!cur) return pre;
    let next = cur.next;
    cur.next = pre;
    return reverse(cur, next);
  };
  return reverse(null, head);
};
