import { dubbleSort, dubbleSort2, dubbleSort3 } from "./bubbleSort";
import { insertionSort, binaryInsertionSort } from "./insertionSort";
import { selectionSort } from "./selectionSort";
import { mergeSort2, mergeSort } from "./mergeSort";
import { quickSort, quickSort2 } from "./quickSort";
import { shellSort } from "./shellSort";

const run = function () {
  const arrays = [];
  for (let index = 0; index < 10000; index++) {
    arrays.push(Math.ceil(Math.random() * 100));
  }

  const sort11 = dubbleSort(arrays.slice()).join(",");
  const sort12 = dubbleSort2(arrays.slice()).join(",");
  const sort13 = dubbleSort3(arrays.slice()).join(",");

  console.log("冒泡排序结果===", sort12 === sort13, sort12 === sort11);

  const sort21 = insertionSort(arrays.slice()).join(",");
  const sort22 = binaryInsertionSort(arrays.slice()).join(",");

  console.log("插入排序结果===", sort21 === sort22, sort21 === sort11);

  const sort31 = selectionSort(arrays.slice()).join(",");

  console.log("选择排序结果===", sort31 === sort11);

  const sort41 = mergeSort(arrays.slice()).join(",");
  const sort42 = mergeSort2(arrays.slice()).join(",");

  console.log("归并排序结果===", sort41 === sort42);

  const sort51 = quickSort(arrays.slice(), 0, arrays.length - 1).join(",");
  const sort52 = quickSort2(arrays.slice()).join(",");

  console.log("快速排序结果===", sort51 === sort52);

  const sort61 = shellSort([
    3,
    44,
    38,
    5,
    47,
    15,
    36,
    26,
    27,
    2,
    46,
    4,
    19,
    50,
    48,
  ]).join(",");
  console.log("希尔排序结果===", sort51 === sort61);
};

run();
