const express = require('express'); 
const fs = require('fs'); 

const app = express();
const port = 3000;
app.use(express.json());

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
//         id: req.params,
//         email: 'test@test.test'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Helper functions
// const getAllBooks = () => {
//     fs.readFile("../data.json", "utf8", async (err, data) => {
//         let books = await JSON.parse(data);
//         return books;
//     });
// };
const getAllBooks = async () => {
    try {
        const data = await fs.readFile('../data.json', 'utf8');
        return JSON.parse(data);

    } catch (err) {
        console.error("Error reading file:", err)
        throw err;
    }
};

// API Endpoints

// The client has requested all of the books
// API Endpoints
app.get("/books", async (req, res) => {
    try {
        const books = await getAllBooks();
        res.json(books); // Use res.json for auto conversion
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// // The client has requested one book
// app.get("/books/:id", async (req, res) => {
//     const book = await getBook(request.params.id);
//     res.send(JSON.stringify(book));
// });
