// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================
// Coding 须知：
//   本次 Coding 时间限制为 45 分钟
//   题目难度大致自上向下递增，请量力答题
// =====================================================

// 问题 1`
// 解析 URL 中的 queryString，返回一个对象 解析异常的 展示 ’{}‘
// 返回值示例：
// {
//   name: 'coder',
//   age: '20',
//   callback: 'https://youzan.com?name=test',
//   list: [a, b],
//   json: {str: "abc", num: 123}, // json key 是固定
// }
const testURL = `https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D`;
function parseQueryString(url) {
  let queryString = {};
  const decodeUrl = decodeURIComponent(testURL.trim());
  const findFirst = decodeUrl.indexOf("?");
  if (!decodeUrl || !~findFirst) {
    return queryString;
  }
  const query = decodeUrl.slice(findFirst + 1);
  const queryArr = query.split("&");
  queryArr.forEach(function (item) {
    let left = item.slice(0, item.indexOf("="));
    let right = item.slice(item.indexOf("=") + 1);
    try {
      right = JSON.parse(right);
    } catch (error) {}
    if (queryString[left]) {
      if (!Array.isArray(queryString[left])) {
        queryString[left] = [queryString[left]];
        queryString[left].push(right);
      } else {
        queryString[left].push(right);
      }
    } else {
      queryString[left] = right;
    }
  });
  return queryString;
}

console.log(parseQueryString(testURL));

/**
 * 问题 2
 * 统计一个复杂对象中的英文字符 a-z以及A-Z个数，
 * 输入：
 * {
 *  name: 'code',
 *  obj: {
 *      name: 'CODE',
 *      age: [12, 45, 20],
 *      info: {
 *          nick: 'haha!'
 *      }
 *  },
 *  hooby: ['a', 'B']
 * }
 * 输出：14
 */
const obj = {
  name: "code",
  obj: {
    name: "CODE",
    age: [12, 45, 20],
    info: {
      nick: "haha!",
    },
  },
  hooby: ["a", "B"],
};

function calcCountOfObject(obj) {
  let count = 0;
  const calc = function (obj) {
    if (obj === null || typeof obj !== "object") {
      for (var i = 0; i < obj.length; i++) {
        var a = obj.charAt(i);
        if (
          typeof a === "string" &&
          a.toLowerCase() >= "a" &&
          a.toLowerCase() <= "z"
        ) {
          count += 1;
        }
      }
    } else {
      const keys = !Array.isArray(obj) && Object.keys(obj);
      const len = (keys || obj).length;
      let index = -1;
      while (++index < len) {
        const element = (keys || obj)[index];
        return calc(obj[keys ? element : index]);
      }
    }
  };
  calc(obj);
  return count;
}
console.log(calcCountOfObject(obj));
/**
 * 问题 3
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如`110000000000000000000000000000000000000000000000`，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
 * 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 *
 * 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
 * 示例输入：`"110010000000000000000000000000000000000000000000"`
 * 示例输出：`["00:00~01:00", "02:00~02:30"]`
 */

function timeBitmapToRanges(time) {
  const tmp = time.split("");
  const timearr = tmp.slice(0, tmp.lastIndexOf("1") + 1);
  const result = [];
  for (var i = 0; i < timearr.length; i += 2) {
    const temi = i / 2;
    const lefthour = temi < 10 ? `0${temi}` : temi;
    const righthour = temi + 1 < 10 ? `0${temi + 1}` : temi + 1;
    let tem = "";
    if (timearr[i] === "1" && timearr[i + 1] === "1") {
      tem = `${lefthour}:00~${righthour}:00`;
    } else if (timearr[i] === "1" && timearr[i + 1] !== "1") {
      tem = `${lefthour}:00~${lefthour}:30`;
    } else if (timearr[i] !== "1" && timearr[i + 1] === "1") {
      tem = `${lefthour}:30~${righthour}:00`;
    }
    if (tem) result.push(tem);
  }
  return result;
}

console.log(
  timeBitmapToRanges("11001011000000110000000000000000000110000000000")
);
