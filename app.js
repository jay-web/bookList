// Book constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI CONSTRUCTOR

function UI() {}

UI.prototype.addBookList = function(book) {

    const list = document.getElementById('book-list');

    // CREATE ROW

    const row = document.createElement('tr');

    // add item in row

    row.innerHTML = `
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th>${book.isbn}</th>
        <th><a href="#" class="delete">Delete</a> </th>
    
    `
        // add the row to the list

    list.appendChild(row);

}

UI.prototype.showAlert = function(message, className) {
    // CREATE DIV
    const div = document.createElement('div');

    // ADD CLASS IN DIV

    div.className = `alert ${className}`;

    // APPEND THE TEXT

    div.appendChild(document.createTextNode(message));

    // catch the container
    const container = document.querySelector('.container');

    // catch form 

    const form = document.getElementById('book-form');

    // insert the div in container before form

    container.insertBefore(div, form);

    // remove the alert after 3 second

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.clearFields = function() {
    document.getElementById('book-name').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}

UI.prototype.deleteList = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}


// EVENT LISTENER

var form = document.getElementById('book-form');

form.addEventListener("submit", function(e) {

    const title = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // create new book object
    const book = new Book(title, author, isbn);

    // create UI

    const ui = new UI();

    // VALIDATION

    if (title === '' || author === '' || isbn === '') {

        // CALL THE SHOWALERT FUNCTION FROM UI
        ui.showAlert("Please enter all the fields", "error");

    } else {
        ui.addBookList(book);
        ui.showAlert("Book has been added successfully", "success");
        // call to clear the inputs

        ui.clearFields();
    }



    e.preventDefault();
});

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteList(e.target);

    ui.showAlert("Book List has been deleted successfully", "success");

    e.preventDefault();
})