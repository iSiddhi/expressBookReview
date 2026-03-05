const express = require('express');
const books = require("./booksdb.js");
const axios = require("axios");

const public_users = express.Router();

// Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book by ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(`http://localhost:5000/`);
    return res.status(200).json(response.data[isbn]);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// Get books by author using async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const response = await axios.get(`http://localhost:5000/`);
    const booksList = Object.values(response.data).filter(
      book => book.author === author
    );
    return res.status(200).json(booksList);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Get books by title using async/await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const response = await axios.get(`http://localhost:5000/`);
    const booksList = Object.values(response.data).filter(
      book => book.title === title
    );
    return res.status(200).json(booksList);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

// Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;