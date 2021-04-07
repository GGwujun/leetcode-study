var MacroCommand = {
  commands: [],
  add: function (command) {
    this.commands.push(command);

    return this;
  },
  remove: function (command) {
    if (!command) {
      this.commands = [];
      return;
    }
    for (var i = 0; i < this.commands.length; ++i) {
      if (this.commands[i] === command) {
        this.commands.splice(i, 1);
      }
    }
  },
  execute: function () {
    for (var i = 0; i < this.commands.length; ++i) {
      this.commands[i].execute();
    }
  },
};

var showTime = {
  execute: function () {
    console.log("time");
  },
};

var showName = {
  execute: function () {
    console.log("name");
  },
};

var showAge = {
  execute: function () {
    console.log("age");
  },
};

MacroCommand.add(showTime).add(showName).add(showAge);

MacroCommand.remove(showName);

MacroCommand.execute(); // time age

/**
 * 编辑器
 */

// 自增
function IncrementCommand() {
  // 当前值
  this.val = 0;
  // 命令栈
  this.stack = [];
  // 栈指针位置
  this.stackPosition = -1;
}

IncrementCommand.prototype = {
  constructor: IncrementCommand,

  // 执行
  execute: function () {
    this._clearRedo();
    // 定义执行的处理
    var command = function () {
      this.val += 2;
    }.bind(this);

    // 执行并缓存起来
    command();
    this.stack.push(command);
    this.stackPosition++;
    this.getValue();
  },

  canUndo: function () {
    return this.stackPosition >= 0;
  },

  canRedo: function () {
    return this.stackPosition < this.stack.length - 1;
  },

  // 撤销
  undo: function () {
    if (!this.canUndo()) {
      return;
    }

    this.stackPosition--;

    // 命令的撤销，与执行的处理相反
    var command = function () {
      this.val -= 2;
    }.bind(this);

    // 撤销后不需要缓存
    command();
    this.getValue();
  },

  // 重做
  redo: function () {
    if (!this.canRedo()) {
      return;
    }

    // 执行栈顶的命令
    this.stack[++this.stackPosition]();

    this.getValue();
  },

  // 在执行时，已经撤销的部分不能再重做
  _clearRedo: function () {
    this.stack = this.stack.slice(0, this.stackPosition + 1);
  },

  // 获取当前值
  getValue: function () {
    console.log(this.val);
  },
};

var incrementCommand = new IncrementCommand();

// 模拟事件触发，执行命令
var eventTrigger = {
  // 某个事件的处理中，直接调用命令的处理方法
  increment: function () {
    incrementCommand.execute();
  },

  incrementUndo: function () {
    incrementCommand.undo();
  },

  incrementRedo: function () {
    incrementCommand.redo();
  },
};

eventTrigger["increment"](); // 2
eventTrigger["increment"](); // 4

eventTrigger["incrementUndo"](); // 2

eventTrigger["increment"](); // 4

eventTrigger["incrementUndo"](); // 2
eventTrigger["incrementUndo"](); // 0
eventTrigger["incrementUndo"](); // 无输出

eventTrigger["incrementRedo"](); // 2
eventTrigger["incrementRedo"](); // 4
eventTrigger["incrementRedo"](); // 无输出

eventTrigger["increment"](); // 6
