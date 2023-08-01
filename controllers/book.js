const Book = require('../models/book');

const createBook = async (req, res) => {
  try {
    const { book, image } = req.body;
    const newBook = new Book({book, image});
    await newBook.save();
    res.status(201).json({message: 'Book saved successfully'});
  } catch (err) {
    console.error('error to create book:', err)
    res.status(500).json({error: 'An error occurred while creating the book.'});
  }
};

const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (err) {
    console.error('error get all books:', err)
    res.status(500).json({error: 'An error occurred while creating the book.'});
  }
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(book);
};

const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "Book deleted" });
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
}