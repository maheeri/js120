function objectsEqual(obj1, obj2) {
  return keyValuesEqual(obj1, obj2) && keyValuesEqual(obj2, obj1);
}

function keyValuesEqual(obj1, obj2) {
  for (let key in obj1) {
    if (!(key in obj2) || obj2[key] !== obj1[key]) {
      return false;
    }
  }
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo'}, {a: 'foo', b: 'bar'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false