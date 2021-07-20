function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
  
    getDescription() {
      let readDescription = "I haven't read it."
      if (read) {
        readDescription = 'I have read it.';
      }
      return `${this.title} was written by ${this.author}. ${readDescription}`;
    },

    readBook() {
      this.read = true;
    }
  }
}



let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"

console.log(book1.read);
book1.readBook();
console.log(book1.read);

console.log(book2.read);
console.log(book3.read);