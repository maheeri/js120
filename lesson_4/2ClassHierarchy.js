class Greeting {
  greet(str) {
    console.log(str);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let greeting = new Greeting();
greeting.greet('Hiya');

let hello = new Hello();
hello.hi();

let goodbye = new Goodbye();
goodbye.bye();