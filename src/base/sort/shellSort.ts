export function shellSort(array) {
  var len = array.length,
    temp,
    gap = 1;
  console.time("希尔排序耗时");
  while (gap < len / 5) {
    //动态定义间隔序列
    gap = gap * 5 + 1;
  }
  // 增量次数，结束条件是增量=1
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = array[i];
      console.log(666, temp);
      for (var j = i - gap; j >= 0 && array[j] > temp; j -= gap) {
        array[j + gap] = array[j];
      }
      array[j + gap] = temp;
    }
  }
  console.timeEnd("希尔排序耗时");
  return array;
}
