const express = require('express');
const app = express();
const PORT = 5000;
const BASE_URL = '/api/books';
const books = [
    {id: 1, name: 'Blackout'},
    {id: 2, name: 'Vicious'}
];

app.use(express.json());
app.listen(PORT, () => {
    console.log('Server started');
});
// get all books
app.get(BASE_URL, (req,res) => {
    return res.send(books);
});
// get book by id
app.get(`${BASE_URL}/:id`, (req,res) => {
    const book = books.find(book => book.id == req.params.id);

    if(!book) {
        return res.status(404).send({msg:'Book not found'});
    }
    return res.send(book);
})
// add new book
app.post(BASE_URL, (req,res) => {
    const bookName = req.body.name;

    if(bookName === '') {
        return res.status(400).send({msg:'Invalid book'});
    }
    const newBook = {id: books.length + 1, name: bookName};
    books.push(newBook);
    return res.send(newBook);
});
// update name by id
app.put(`${BASE_URL}/:id`, (req,res) => {
    const newTitle = req.body.name;

    if(newTitle === '') {
        return res.status(400).send({msg:'Invalid title'});
    }
    const book = books.find(book => book.id == req.params.id);
    if(book) {
        book.name = newTitle;
        return res.send(book);
    }
    return res.status(404).send({msg:'Book not found'});
})
// delete book by id
app.delete(`${BASE_URL}/:id`, (req,res) => {
    const bookIdx = books.findIndex(book => book.id == req.params.id);
    if(bookIdx === -1) {
        return res.status(404).send({msg:'Book not found'});
    }
    books.splice(bookIdx,1);
    return res.send(req.params.id);
})