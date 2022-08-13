// creat array
myLibrary = []
// User Interface
var getTitle = document.getElementById('title');
var getAuthor = document.getElementById('author');
var getStatut = document.getElementById('statut');

var tableBody = document.getElementById('tableBody');

// creat the class BOOK 
class Books {
    constructor(title, author, statut) {
        this.title = title;
        this.author = author;
        this.statut = statut;
    }
}

// creat the row in HTML
function creatDesLignes() {

    // create celle for a row.
    for (let i = 0; i < myLibrary.length; i++ ) {

         /// créer une ligne
        var bookRow = tableBody.insertRow();

        // cell TITRE
        var cellTitre = bookRow.insertCell();
        cellTitre.textContent = myLibrary[i].title;

        // cell Author 
        var cellAuthor = bookRow.insertCell();
        cellAuthor.textContent = myLibrary[i].author;

        // cell statut 
        var cellStatut = bookRow.insertCell();
        var buttonStatut = document.createElement("button");
        buttonStatut.textContent = myLibrary[i].statut;

        cellStatut.appendChild(buttonStatut);

        buttonStatut.addEventListener("click", function(event) {
            changeStatut(event.target)
        });

        // cell delete 
        var cellDelete = bookRow.insertCell();
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("id",i)
        buttonDelete.innerHTML = "Delete";
        
        cellDelete.appendChild(buttonDelete);

        buttonDelete.addEventListener("click", function(event) {
            if(confirm('Are you sure you want to delete ',myLibrary[i].title)){
                deleteBook(event.target.id);
                event.target.closest("tr").remove();    
            }
            });
        }
}

// Creat function change Statut
function changeStatut(buttonStatut) {
    if (this.statut === "Read") {
        buttonStatut.innerHTML = "Not read";
        this.statut = "Not Read";
    } else {
        buttonStatut.innerHTML = "Read";
        this.statut = "Read";
    }

}
// Creat remove a books from array myLibrary by index. 
function deleteBook(index) { 
    myLibrary.splice(index,1) 
}

// function to add library to local storage
function updateToLocalStorage() {
    // conver the array to string then store it.
    localStorage.setItem('books', JSON.stringify(myLibrary));
}
// Creat function addBookToLibrary 
function addBookToLibrary() {
    if (getTitle.value.length === 0 || getAuthor.value.length === 0) {
        alert("Please, fill all the fields");
        return;
      }

    var book = new Books(getTitle.value, getAuthor.value, getStatut.value);

    // add Book in array myLibrary
    myLibrary.push(book);
    //update our localStorage whenever the user inserts some new book.
    updateToLocalStorage()
    // clear everything inside <tbbody>
    tableBody.innerHTML = "";
    // creat the row in the table body
    creatDesLignes()
}

// function helps to get everything from local storage
function checkLocalStorage() {
    var reference = localStorage.getItem('books');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
      myLibrary = JSON.parse(reference);
      creatDesLignes(myLibrary);
    }
  }
  // initially get everything from localStorage
//   checkLocalStorage() 

// function removeStorage() {
//     localStorage.removeItem(myLibrary);
// }
// removeStorage()