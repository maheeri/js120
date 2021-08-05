// name property added to make objects easier to identify
let foo = {
  name: 'foo',
  ancestors() {
    let self = this;
    let ancestors = [];
    while (Object.getPrototypeOf(self) !== Object.prototype) {
      ancestors.push(self.name);
      self = Object.getPrototypeOf(self);
    }
    ancestors.push('Object.prototype');
    return ancestors;
  }
};

let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']