/**
 * 队列是遵循 FIFO（First In First Out，先进先出）原则的一组有序的项
 * 队列在尾部添加新元素，并从顶部移除元素
 * 最新添加的元素必须排在队列的末尾
 * 队列只有 入队 push() 和出队 pop()
 */

export class Queue {
  items: any[] = [];
  enqueue(data, priority?) {
    this.items.push(data);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
  print() {
    console.log("Queue===", this.items.toString());
  }
}

// 创建Queue实例
// var queue = new Queue();
// console.log(queue.isEmpty()); // true
// queue.enqueue("John"); // undefined
// queue.enqueue("Jack"); // undefined
// queue.enqueue("Camila"); // undefined
// queue.print(); // "John,Jack,Camila"
// console.log(queue.size()); // 3
// console.log(queue.isEmpty()); // false
// queue.dequeue(); // "John"
// queue.dequeue(); // "Jack"
// queue.print(); // "Camila"
// queue.clear(); // undefined
// console.log(queue.size()); // 0

/**
 * 优先队列，添加元素和删除元素是有优先级的
 * 应用
 * 一个现实的例子就是机场登机的顺序。头等舱和商务舱乘客的优先级要高于经济舱乘客。
 * 再比如：火车，老年人、孕妇和带小孩的乘客是享有优先检票权的
 * 优先队列分为两类
 * 最小优先队列:最小优先队列是把优先级的值最小的元素被放置到队列的最前面（代表最高的优先级）
 * 最大优先队列正好相反，把优先级值最大的元素放置在队列的最前面
 *
 * 实现方式
 * 1、设置优先级，根据优先级正确添加元素，然后和普通队列一样正常移除
 * 2、设置优先级，和普通队列一样正常按顺序添加，然后根据优先级移除
 */

/**
 * 最小优先队列
 */
class MinPriorityQueue extends Queue {
  enqueue(data, priority) {
    const queueData = {
      data: data,
      priority: priority,
    };
    if (this.isEmpty()) {
      this.items.push(queueData);
    } else {
      let added = false;
      // 1 - 3  5  6 -7
      for (let index = 0; index < this.size(); index++) {
        const iterator = this.items[index];
        if (iterator.priority > priority) {
          added = true;
          this.items.splice(index, 0, queueData);
          break;
        }
      }
      if (!added) {
        this.items.push(queueData);
      }
    }
  }
  print() {
    var strArr = [];
    strArr = this.items.map(function (item) {
      return `${item.data}->${item.priority}`;
    });

    console.log(strArr.toString());
  }
}

// 创建最小优先队列minPriorityQueue实例
// var minPriorityQueue = new MinPriorityQueue();

// console.log(minPriorityQueue.isEmpty());     // true
// minPriorityQueue.enqueue("John", 1);         // undefined
// minPriorityQueue.enqueue("Jack", 3);         // undefined
// minPriorityQueue.enqueue("Camila", 2);       // undefined
// minPriorityQueue.enqueue("Tom", 3);          // undefined
// minPriorityQueue.print();                    // "John->1,Camila->2,Jack->3,Tom->3"
// console.log(minPriorityQueue.size());        // 4
// console.log(minPriorityQueue.isEmpty());     // false
// minPriorityQueue.dequeue();                  // {element: "John", priority: 1}
// minPriorityQueue.dequeue();                  // {element: "Camila", priority: 2}
// minPriorityQueue.print();                    // "Jack->3,Tom->3"
// minPriorityQueue.clear();                    // undefined
// console.log(minPriorityQueue.size());        // 0

/**
 * 最大优先队列
 */
class MaxPriorityQueue extends Queue {
  enqueue(data, priority) {
    const queueData = {
      data: data,
      priority: priority,
    };
    if (this.isEmpty()) {
      this.items.push(queueData);
    } else {
      let added = false;
      // 1 - 3  5  6 -7
      for (let index = 0; index < this.size(); index++) {
        const iterator = this.items[index];
        if (iterator.priority < priority) {
          added = true;
          this.items.splice(index, 0, queueData);
          break;
        }
      }
      if (!added) {
        this.items.push(queueData);
      }
    }
  }
  print() {
    var strArr = [];
    strArr = this.items.map(function (item) {
      return `${item.data}->${item.priority}`;
    });

    console.log(strArr.toString());
  }
}

// 创建最大优先队列maxPriorityQueue实例

// var maxPriorityQueue = new MaxPriorityQueue();
// console.log(maxPriorityQueue.isEmpty()); // true
// maxPriorityQueue.enqueue("John", 1); // undefined
// maxPriorityQueue.enqueue("Jack", 3); // undefined
// maxPriorityQueue.enqueue("Camila", 2); // undefined
// maxPriorityQueue.enqueue("Tom", 3); // undefined
// maxPriorityQueue.print(); // "Jack->3,Tom->3,Camila->2,John->1"
// console.log(maxPriorityQueue.size()); // 4
// console.log(maxPriorityQueue.isEmpty()); // false
// maxPriorityQueue.dequeue(); // {element: "Jack", priority: 3}
// maxPriorityQueue.dequeue(); // {element: "Tom", priority: 3}
// maxPriorityQueue.print(); // "Camila->2,John->1"
// maxPriorityQueue.clear(); // undefined
// console.log(maxPriorityQueue.size()); // 0

/**
 * 循环队列，顾名思义，它长得像一个环。把它想像成一个圆的钟就对了。
 * 关键是：确定好队空和队满的判定条件
 * 循环队列的一个例子就是击鼓传花游戏（Hot Potato）。在这个游戏中，孩子们围城一个圆圈，击鼓的时候把花尽快的传递给旁边的人。某一时刻击鼓停止，这时花在谁的手里，谁就退出圆圈直到游戏结束。重复这个过程，直到只剩一个孩子（胜者）
 * 实现击鼓传花
 */

const hotPotato = (nameList, num) => {
  let queue = new Queue();
  nameList.forEach((name) => queue.enqueue(name));
  var eliminated = "";
  while (queue.size() > 1) {
    for (let index = 0; index < num; index++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(`${eliminated} 在击鼓传花中被淘汰！`);
  }
  // 最后只剩一个元素
  return queue.dequeue();
};

// 测试
var nameList = ["John", "Jack", "Camila", "Ingrid", "Carl"];
var winner = hotPotato(nameList, 10);
console.log(`最后的胜利者是：${winner}`);
