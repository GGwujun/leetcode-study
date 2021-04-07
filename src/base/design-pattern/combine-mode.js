// 文件夹 组合对象
function Folder(name) {
  this.name = name;
  this.parent = null;
  this.files = [];
}

Folder.prototype = {
  constructor: Folder,

  add: function (file) {
    file.parent = this;
    this.files.push(file);

    return this;
  },

  scan: function () {
    // 委托给叶对象处理
    for (var i = 0; i < this.files.length; ++i) {
      this.files[i].scan();
    }
  },

  remove: function (file) {
    if (typeof file === "undefined") {
      this.files = [];
      return;
    }

    for (var i = 0; i < this.files.length; ++i) {
      if (this.files[i] === file) {
        this.files.splice(i, 1);
      }
    }
  },
};

// 文件 叶对象
function File(name) {
  this.name = name;
  this.parent = null;
}

File.prototype = {
  constructor: File,

  add: function () {
    console.log("文件里面不能添加文件");
  },

  scan: function () {
    var name = [this.name];
    var parent = this.parent;

    while (parent) {
      name.unshift(parent.name);
      parent = parent.parent;
    }

    console.log(name.join(" / "));
  },
};

var web = new Folder("Web");
var fe = new Folder("前端");
var css = new Folder("CSS");
var js = new Folder("js");
var rd = new Folder("后端");

web.add(fe).add(rd);

var file1 = new File("HTML权威指南.pdf");
var file2 = new File("CSS权威指南.pdf");
var file3 = new File("JavaScript权威指南.pdf");
var file4 = new File("MySQL基础.pdf");
var file5 = new File("Web安全.pdf");
var file6 = new File("Linux菜鸟.pdf");

css.add(file2);
fe.add(file1).add(file3).add(css).add(js);
rd.add(file4).add(file5);
web.add(file6);

rd.remove(file4);

// 扫描
web.scan();
