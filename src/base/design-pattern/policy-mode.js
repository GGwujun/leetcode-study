// 通过学生成绩等级求成绩，我们把具体每一个等级的加权和计算作为策略组，具体调用求成绩的函数作为执行组
const LEVEL_MAP = {
  S: 10,
  A: 8,
  B: 6,
  C: 4,
};

const ScoreLevel = {
  basicScore: 80,
  S: function () {
    return this.basicScore + LEVEL_MAP["S"];
  },
  A: function () {
    return this.basicScore + LEVEL_MAP["A"];
  },

  B: function () {
    return this.basicScore + LEVEL_MAP["B"];
  },

  C: function () {
    return this.basicScore + LEVEL_MAP["C"];
  },
};

function getScore(level) {
  return ScoreLevel[level] ? ScoreLevel[level]() : 0;
}

console.log(
  getScore("S"),
  getScore("A"),
  getScore("B"),
  getScore("C"),
  getScore("D")
); // 90 88 86 84 0

/**
 * 表单校验
 */

// 错误提示
var errorMsgs = {
  default: "输入数据格式不正确",
  minLength: "输入数据长度不足",
  isNumber: "请输入数字",
  required: "内容不为空",
};

// 规则集
var rules = {
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg || errorMsgs["minLength"];
    }
  },
  isNumber: function (value, errorMsg) {
    if (!/\d+/.test(value)) {
      return errorMsg || errorMsgs["isNumber"];
    }
  },
  required: function (value, errorMsg) {
    if (value === "") {
      return errorMsg || errorMsgs["required"];
    }
  },
};

// 校验器
function Validator() {
  this.items = [];
}

Validator.prototype = {
  constructor: Validator,

  // 添加校验规则
  add: function (value, rule, errorMsg) {
    var arg = [value];

    if (rule.indexOf("minLength") !== -1) {
      var temp = rule.split(":");
      arg.push(temp[1]);
      rule = temp[0];
    }

    arg.push(errorMsg);

    this.items.push(function () {
      // 进行校验
      return rules[rule].apply(this, arg);
    });
  },

  // 开始校验
  start: function () {
    for (var i = 0; i < this.items.length; ++i) {
      var ret = this.items[i]();

      if (ret) {
        console.log(ret);
        // return ret;
      }
    }
  },
};

// 测试数据
function testTel(val) {
  return val;
}

var validate = new Validator();

validate.add(testTel("ccc"), "isNumber", "只能为数字"); // 只能为数字
validate.add(testTel(""), "required"); // 内容不为空
validate.add(testTel("123"), "minLength:5", "最少5位"); // 最少5位
validate.add(testTel("12345"), "minLength:5", "最少5位");

var ret = validate.start();

console.log(ret);
