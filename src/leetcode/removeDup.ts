const removeDup = function (array) {
  var result = [];
  var hashMap = {};
  for (var i = 0; i < array.length; i++) {
    var temp = array[i];
    if (!hashMap[temp]) {
      hashMap[temp] = true;
      result.push(temp);
    }
  }
  return result;
};
