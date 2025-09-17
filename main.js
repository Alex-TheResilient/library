// Functionality for book form
const form = document.querySelector('#book-form');

const myLibrary = [];

function defaultBooks() {
  const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, 'read');
  const book2 = new Book('1984', 'George Orwell', 328, 'not-read');
  const book3 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, 'reading');
  addBookToLibrary(book1);
  addBookToLibrary(book2);
  addBookToLibrary(book3);
  renderLibrary();
}

window.onload = function () {
  defaultBooks();
};

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read === 'read'
        ? 'read'
        : this.read === 'reading'
        ? 'reading'
        : 'not read yet'
    }`;
  }
}

function renderLibrary() {
  const notReadDiv = document.querySelector('#not-read-column .books');
  const readingDiv = document.querySelector('#reading-column .books');
  const readDiv = document.querySelector('#read-column .books');

  notReadDiv.innerHTML = '';
  readingDiv.innerHTML = '';
  readDiv.innerHTML = '';

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    const title = document.createElement('h4');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.innerHTML = `<strong>Author:</strong> ${book.author}`;

    const pages = document.createElement('p');
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;

    const readSelect = document.createElement('select');
    ['not-read', 'reading', 'read'].forEach((opt) => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent =
        opt === 'not-read'
          ? 'Not Read'
          : opt.charAt(0).toUpperCase() + opt.slice(1);
      if (book.read === opt) option.selected = true;
      readSelect.appendChild(option);
    });
    readSelect.addEventListener('change', (e) => {
      book.read = e.target.value;
      renderLibrary();
    });

    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'icons/delete-icon.svg';
    deleteIcon.alt = 'Delete book';
    deleteBtn.prepend(deleteIcon);

    deleteBtn.addEventListener('click', () => {
      const idx = myLibrary.findIndex((b) => b.id === book.id);
      if (idx !== -1) {
        myLibrary.splice(idx, 1);
        renderLibrary();
      }
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readSelect);
    bookCard.appendChild(deleteBtn);

    if (book.read === 'not-read') {
      notReadDiv.appendChild(bookCard);
    } else if (book.read === 'reading') {
      readingDiv.appendChild(bookCard);
    } else if (book.read === 'read') {
      readDiv.appendChild(bookCard);
    }
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
  // console.log(`Book added: ${book.info()}`);
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
