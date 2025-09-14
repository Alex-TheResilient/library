// Functionality for book form
const form = document.querySelector('#book-form');

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error('Book constructor must be called with "new"');
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read === 'read'
        ? 'read'
        : this.read === 'reading'
        ? 'reading'
        : 'not read yet'
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(`Book added: ${book.info()}`);
}

document.querySelector('#add-book').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('hidden');
});

document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('#modal').classList.add('hidden');
});

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const readStatus = formData.get('read-status');
  const newBook = new Book(title, author, pages);
  newBook.read = readStatus;
  console.log(newBook);
  addBookToLibrary(newBook);
  form.reset();
  document.querySelector('#modal').classList.add('hidden');
});
