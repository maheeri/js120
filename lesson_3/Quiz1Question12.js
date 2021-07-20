function Foo(parm) {
  this.parm = parm;
}

Foo.bar = function() {
  // omitted code
};

Foo.prototype.qux = function() {
  // omitted code
};

let foo = new Foo(10);

class Foo {
  constructor(parm) {
    this.parm = parm;
  }

  static bar() {
    // omitted code
  }

  qux() {
    // omitted code
  }
}

// let foo = new Foo(10);
console.log(foo.__proto__.hasOwnProperty('qux'));