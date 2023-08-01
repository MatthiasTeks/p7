const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  grade: { type: Number, required: true },
});

const BookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: String,
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: [RatingSchema],
  averageRating: Number,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
