
const express = require('express');
const router  = express.Router();

const Book = require('../models/Book');
const Author = require('../models/Author');

// ****************************************************************************************

// GET - to display the form to create a new book
router.get('/books/new', (req, res, next) => {
  Author
    .find()
    .then(allAuthors => res.render("book-views/new-book", { allAuthors }))
    .catch(err => console.log("Error while displaying form for new book: ", err));
});

// ****************************************************************************************

// POST - create a book
// <form action="/books/create" method="post">
router.post('/books/create', (req, res, next) => {
  // console.log('The data from the form: ', req.body);
  // the "value" from option gets saved inside req.body object
  Book
    .create(req.body)
    .then(newBook => {
      // console.log("NEW BOOK: ", newBook);
      res.redirect("/books");
    })
    .catch(err => console.log("Error while creating a new book: ", err));
});


// GET route to display all the books
router.get("/books", (req, res, next) => {
  Book
    .find()
    .then(booksFromDB => res.render("book-views/allBooks", { booksFromDB }))
    .catch(err => console.log("error while getting all the books: ", err));
});

// ****************************************************************************************

// POST route to delete the book
// action="/books/{{this._id}}/delete"
router.post("/books/:theId/delete", (req, res, next) => {
  Book
    .findByIdAndDelete(req.params.theId)
    .then(() => res.redirect("/books"))
    .catch(err => console.log("Error while deleting the book: ", err));
});

// ****************************************************************************************

// GET route to display the form for updating the book
router.get("/books/:theId/edit", (req, res, next) => {
  Book
    .findById(req.params.theId)
    .then( theBook => {
      Author
        .find()
        .then(allAuthors => {
          allAuthors.forEach(theAuthor => {
            if(theBook.author.equals(theAuthor._id)){
              // create additional key in the author object to differentiate the author that wrote this book 
              // from all the other authors
              theAuthor.isWriter = true;
            }
          });
          res.render("book-views/editBook", { theBook, allAuthors });
        })
        .catch(err => console.log("Error while getting all the authors: ", err));
    })
    .catch(err => console.log("Error while getting the book from DB: ", err));
}); 

// ****************************************************************************************

// POST route to save the updates 
{/* <form action="/books/{{theBook._id}}/update" method="post"> */}
router.post("/books/:id/update", (req, res, next) => {
  Book
    // find by id and pass the new req.body to replace previous document in the DB
    .findByIdAndUpdate(req.params.id, req.body)
    .then(updatedBook => res.redirect(`/books/${updatedBook._id}`))
    .catch(err => console.log("Error while updating the book: ", err));
});

// ****************************************************************************************

// GET route for displaying the book details page
// http://localhost:3000/books/5c52542abbd9c887b58e24a7 <== this 'bookId' will change dynamically when we click on each book
router.get("/books/:bookId", (req, res, next) => {
  Book
    .findById(req.params.bookId)
    .populate("author") // .populate("author") => we are saying: give me all the details related to the 'author' field in the book 
                        // (there's only author id there so what it does is-finds the rest 
                        // of information related to that author based on the id)
    .then(theBook => {
      // console.log("Details page : ", theBook)
      res.render("book-views/bookDetails", { theBook });
    })
    .catch(err => console.log("Error while getting the details of a book: ", err));
});

module.exports = router;





//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////





// //normally file shoud just be author.js
// const express = require("express");
// const router = express.Router();
// // require Author model in orderr to use it for CRUD
// const Book = require("../models/Book");
// const Author = require("../models/Author");


// //GET - to display the form for creating the authors

// router.get("/books/new", (req, res, next) => {

//   Author
//   .find()
//   .then(allAuthors =>  res.render("book-views/new-book", {allAuthors}))
//   .catch(err => console.log("error while creating new book", err))
//   //make sure you see all the folders that are inside the "views" folders, you dont have to 
//   //specify the views folder
//   res.render("book-views/new-book")
// })

// //post routes to create a new author in the DB
// /* <form action="/authors/create" method="POST" > */
// router.post("/books/create", (req, res, next) => {
//   console.log("the form: ", req.body)
//   Book
//   .create(req.body)
//   .then( newBook => console.log("NEW BOOK: ", newBook) )
//   .catch(err => console.log("Error while creating a new book: ", err));
// })

// router.get("/books", (req, res, next) => {
//   Book
//   .find()
//   .then(booksFromDB => res.render("book-views/allBooks", {books: booksFromDB}))
//   .catch( err => console.log("error while getting the books from the DB: ", err))

// })

// router.get("/books/:bookId", (req,res, next)=>{
//   Book  
//   .findById(req.params.bookId)
//   .then(theBook => {
//     // console.log("")
//     Author.findById(theBook.author)
//     .populate("author")
//   })
//   .catch(err => console.log("error found: ", err))
// })



// // in order to use routes anywhere else in this application, we have to export them
// module.exports = router;

// //..............................................................................................................
