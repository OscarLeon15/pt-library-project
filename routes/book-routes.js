//normally file shoud just be author.js
const express = require("express");
const router = express.Router();
// require Author model in orderr to use it for CRUD
const Book = require("../models/Book");
const Author = require("../models/Author");


//GET - to display the form for creating the authors

router.get("/books/new", (req, res, next) => {

  Author
  .find()
  .then(allAuthors =>  res.render("book-views/new-book", {allAuthors}))
  .catch(err => console.log("error while creating new book", err))
  //make sure you see all the folders that are inside the "views" folders, you dont have to 
  //specify the views folder
  res.render("book-views/new-book")
})

//post routes to create a new author in the DB
/* <form action="/authors/create" method="POST" > */
router.post("/books/create", (req, res, next) => {
  console.log("the form: ", req.body)
  Book
  .create(req.body)
  .then( newBook => console.log("NEW BOOK: ", newBook) )
  .catch(err => console.log("Error while creating a new book: ", err));
})

router.get("/books", (req, res, next) => {
  Book
  .find()
  .then(booksFromDB => res.render("book-views/allBooks", {books: booksFromDB}))
  .catch( err => console.log("error while getting the books from the DB: ", err))

})

router.get("/books/:bookId", (req,res, next)=>{
  Book  
  .findById(req.params.bookId)
  .then(theBook => {
    // console.log("")
    Author.findById(theBook.author)
    .populate("author")
  })
  .catch(err => console.log("error found: ", err))
})



// in order to use routes anywhere else in this application, we have to export them
module.exports = router;



