// Functionality for book form
const form = document.querySelector('#book-form');

const myLibrary = [];

function Book(title, author, pages) {
  if (!new.target) {
    throw new Error('Book constructor must be called with "new"');
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? 'read' : 'not read yet'
    }`;
  };
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}

document.querySelector('#add-book').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('hidden');
});

document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('#modal').classList.add('hidden');
});
