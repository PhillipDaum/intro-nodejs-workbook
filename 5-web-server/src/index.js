const express = require('express'); 
const fs = require('fs').promises; // allows return that you can work with in async 

const app = express();
const port = 3000;
app.use(express.json()); // express is going to use json to pass data back and forth

app.listen(port, () => {
    console.log(`My server is listening on port: ${port}`)
});


// app.get("/", (req, res) => {
//     res.send('<h1>hi mom</h1><p>I had a sandwich yesterday</p>');
// });

// ':user' is a variable
// app.get("/users/:user", (req, res) => {
//     const myData = {
//         // access 'user' variable
//         id: req.params, // this knows that it is the user variable
//         email: 'test@test.test'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Helper functions
const getAllBooks = async () => {
   const books = await fs.readFile("../data.json", "utf8");
   const parsedBooks = JSON.parse(books);
   return parsedBooks;
};

const getOneBook = async (id) => {
    const books = await fs.readFile("../data.json", "utf8");
    const parsedBook = JSON.parse(books)[id];
    return parsedBook;
}

const deleteBook = async (id) => {
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBooks = JSON.parse(books);
    parsedBooks.splice(id, 1);
    const stringBooks = JSON.stringify(parsedBooks);
    await fs.writeFile("../data.json", stringBooks, "utf8")
}


// API Endpoints
// The client has requested all of the books
app.get("/books",async (req, res) => {
        const books = await getAllBooks();
        res.send(JSON.stringify(books))
});

// The client has requested one book
app.get("/book/:id", async (req, res) => {
    const book = await getOneBook(req.params.id);
    res.send(JSON.stringify(book));
});

// Client has requested to delete a book
app.get("/delete-book/:id", async (req, res) => {
    await deleteBook(req.params.id);
    res.send("you deleted the book!")
})