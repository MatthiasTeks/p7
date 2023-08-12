const Book = require('../models/book');

// should create a new book
const createBook = async (req, res) => {
  try {
    const { userId, protocol, file, get } = req;
    let { book } = req.body;

    book = typeof book === 'string' ? JSON.parse(book) : book;

    delete book.userId;
    book.userId = userId;

    if (file) {
      book.imageUrl = `http://localhost:4000/images/${file.filename}`;
    }    

    const newBook = new Book(book);

    await newBook.save();

    res.status(201).json({message: 'Book saved successfully'});
  } catch (err) {
    console.error('error to create book:', err)
    res.status(500).json({error: 'An error occurred while creating the book.'});
  }
};

// should return all books
const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (err) {
    console.error('error get all books:', err)
    res.status(500).json({error: 'An error occurred while creating the book.'});
  }
};

// should return specific book based on id
const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
};

// should return 3 best books based on rating
const getTopRatedBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ averageRating: -1 })
      .limit(3);

    res.status(200).json(books);
  } catch (err) {
    console.error('Error getting top rated books:', err);
    res.status(500).json({ error: 'An error occurred while getting the top rated books.' });
  }
};

// should update specific book based on id and return json book object
const updateBook = async (req, res) => {
  try {
    const { params, body, protocol, get, file } = req;
    const { id } = params;
    const { book } = body;

    if (file) {
      const bookData = JSON.parse(book);
      bookData.imageUrl = `${protocol}://${get('host')}/images/${file.filename}`;
      const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
      res.status(200).json(updatedBook);
    } else {
      const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true });
      res.status(200).json(updatedBook);
    }
  } catch (err) {
    console.error('Failed to update book:', err);
    res.status(500).json({error: 'An error occurred while updating the book.', errorMessage: err.message, errorCode: err.code});
}
};

const rateBook = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    book.ratings.push({ userId, grade: rating });

    let sum = 0;
    for (let i = 0; i < book.ratings.length; i++) {
      sum += book.ratings[i].grade;
    }
    book.averageRating = sum / book.ratings.length;

    await book.save();

    res.status(200).json(book);
  } catch (err) {
    console.error('Error rating book:', err);
    res.status(500).json({ error: 'An error occurred while rating the book.' });
  }
};

// should delete specific book based on id
const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({error: 'An error occurred while deleting the book.', errorMessage: err.message, errorCode: err.code});
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  getTopRatedBooks,
  deleteBook,
  updateBook,
  rateBook,
}