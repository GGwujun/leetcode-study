/**
 * 原型继承
 * 让新实例的原型等于父类的实例
 * 特点：
 * 1、实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。
 * 缺点：
 * 1、新实例无法向父类构造函数传参。
 * 2、继承单一。
 * 3、所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
 */

function Parent(name) {
  this.name = name;
}
function Sub() {}
//@ts-ignore
Sub.prototype = new Parent();

const instance = new Sub();

/**
 * 构造函数继承
 * 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
 * 特点：
 * 1、只继承了父类构造函数的属性，没有继承父类原型的属性。
 * 2、解决了原型链继承缺点1、2、3。
 * 3、可以继承多个构造函数属性（call多个）。
 * 4、在子实例中可向父实例传参。
 * 缺点：
 * 1、只能继承父类构造函数的属性。
 * 2、无法实现构造函数的复用。（每次用每次都要重新调用）
 * 3、每个新实例都有父类构造函数的副本，臃肿。
 */

function Parent2(name) {
  this.name = name;
}
function Sub2(...rags) {
  Parent.call(this, ...rags); // 可以传参数
}
const instance2 = new Sub2();

/**
 * 组合继承（组合原型链继承和借用构造函数继承）（常用）
 * 重点：结合了两种模式的优点，传参和复用
 * 特点：
 * 1、可以继承父类原型上的属性，可以传参，可复用。
 * 2、每个新实例引入的构造函数属性是私有的。
 * 缺点：
 * 1、调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。
 */

function Parent3(name) {
  this.name = name;
}

function Sub3(...rags) {
  Parent3.call(this, ...rags); // 可以传参数
}

//@ts-ignore
Sub3.prototype = new Parent3();

const instance3 = new Sub3();

/**
 * 原型式继承
 * 重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
 * 特点：
 * 1、类似于复制一个对象，用函数来包装。
 * 缺点：
 * 1、无法实现复用。（新实例属性都是后面添加的）
 */

function Create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function Parent4(name) {
  this.name = name;
}

//@ts-ignore
const Sub4 = new Parent4();
const instance4 = Create(Sub4);

/**
 * 寄生式继承
 * 重点：就是给原型式继承外面套了个壳子。
 * 优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
 * 缺点：没用到原型，无法复用。
 */

function Parent5(name) {
  this.name = name;
}

function subObject(obj) {
  const sub = Create(obj);
  sub.name = "dsx";
  return sub;
}

//@ts-ignore
const Sub5 = new Parent5();
const instance5 = subObject(Sub5);

/**
 * 寄生组合式继承（常用）
 * 寄生：在函数内返回对象然后调用
 * 组合：1、函数的原型等于另一个实例。2、在函数中用apply或者call引入另一个构造函数，可传参
 * 重点：修复了组合继承的问题
 */

function Parent6(name) {
  this.name = name;
}

const con = Create(Parent6.prototype);

function Sub6() {
  Parent6.call(this);
}

Sub6.prototype = con;
con.constructor = Sub6;
const sub6 = new Sub6();
