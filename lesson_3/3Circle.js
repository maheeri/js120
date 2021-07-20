let areaObj  = {
  area: function() {
    return Math.PI * (this.radius ** 2);
  }
};

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype = areaObj;

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false