const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// MongoDB Connection URI from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let database;
let booksCollection; 

// Connect to MongoDB Atlas
async function connectToMongoDB() {
  try {
    await client.connect();
    database = client.db('Capstone');
    booksCollection = database.collection('books');
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}
connectToMongoDB();

// Get all available books
async function getAllAvailableBooks(req, res) {
  try {
    const availableBooks = await booksCollection.find({ status: 'available' }).toArray();
    return res.status(200).json(availableBooks);
  } catch (error) {
    console.error('Error fetching available books:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

app.get('/books', getAllAvailableBooks);

// Get all checked-out books
async function getAllCheckedOutBooks(req, res) {
  try {
    const checkedOutBooks = await booksCollection.find({ status: 'checked out' }).toArray();
    return res.status(200).json(checkedOutBooks);
  } catch (error) {
    console.error('Error fetching checked-out books:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

app.get('/books/checked-out', getAllCheckedOutBooks);

// Check out a book
async function checkOutBook(bookTitle, checkedOutBy, dueDate) {
  try {
    const book = await booksCollection.findOneAndUpdate(
      { title: bookTitle, status: 'available' },
      { $set: { status: 'checked out', checkedOutBy, dueDate } },
      { returnOriginal: false }
    );

    if (!book.value) {
      throw new Error('Book not available for checkout or already checked out');
    }

    return book.value;
  } catch (error) {
    throw new Error(`Error checking out book: ${error.message}`);
  }
}

app.put('/books/check-out/:title', async (req, res) => {
  const bookTitle = req.params.title;
  const { checkedOutBy, dueDate } = req.body;

  try {
    const updatedBook = await checkOutBook(bookTitle, checkedOutBy, dueDate);
    res.json({ message: 'Book checked out successfully', book: updatedBook });
  } catch (error) {
    console.error('Error checking out book:', error);
    res.status(400).json({ error: error.message });
  }
});

// Check in a book
async function checkInBook(bookTitle) {
  try {
    const book = await booksCollection.findOneAndUpdate(
      { title: bookTitle, status: 'checked out' },
      { $set: { status: 'available', checkedOutBy: null, dueDate: null } },
      { returnOriginal: false }
    );

    if (!book.value) {
      throw new Error('Book is not currently checked out');
    }

    return book.value;
  } catch (error) {
    throw new Error(`Error checking in book: ${error.message}`);
  }
}

app.put('/books/check-in/:title', async (req, res) => {
  const bookTitle = req.params.title;

  try {
    const updatedBook = await checkInBook(bookTitle);
    res.json({ message: 'Book checked in successfully', book: updatedBook });
  } catch (error) {
    console.error('Error checking in book:', error);
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
