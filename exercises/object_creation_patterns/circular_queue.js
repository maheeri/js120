function CircularQueue(size) {
  this.queue = [];
  for (let idx = 0; idx < size; idx++) {
    this.queue.push(null);
  }
  this.oldestIdx = 0;
  this.currIdx = 0;
}

CircularQueue.prototype.enqueue = function (elem) {
  if (this.queue[this.currIdx] !== null) {
    // if we see a non-null element while inserting, we've swung around
    // to the oldest index
    this.oldestIdx = (this.oldestIdx + 1) % this.queue.length;
  }

  this.queue[this.currIdx] = elem;
  this.currIdx = (this.currIdx + 1) % this.queue.length;
};

CircularQueue.prototype.dequeue = function () {
  let oldestElem = this.queue[this.oldestIdx];
  this.queue[this.oldestIdx] = null;
  if (oldestElem !== null) {
    this.oldestIdx = (this.oldestIdx + 1) % this.queue.length;
  }
  return oldestElem;
};

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);