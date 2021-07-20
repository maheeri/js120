let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon'
};

let getDescription = function () {
  return this.firstName + ' ' + this.lastName + ' is a '
    + this.occupation + '.';
}.bind(turk);

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(getDescription);