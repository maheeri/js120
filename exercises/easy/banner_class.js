class Banner {
  constructor(message, width = message.length) {
    this.message = message;
    this.width = width;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.width)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.width)} |`;
  }

  messageLine() {
    return `| ${this.message.slice(0, this.width)} |`;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+