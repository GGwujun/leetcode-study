function f(m, n) {
  if (n == 1) {
    return 0;
  }
  var x = f(n - 1, m);
  return (m + x) % n;
}

console.log(f(10, 3));
