import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  seriesId: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
  issue: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 10,
  },
  available: {
    type: Boolean,
    default: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  villain: {
    type: String,
    required: true,
  },
  coverHue: {
    type: Number,
    default: 10,
  },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
