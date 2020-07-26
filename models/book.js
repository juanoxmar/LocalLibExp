const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookShema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

BookShema.virtual('url').get(() => `/catalog/book/${this._id}`);

module.exports = mongoose.model('Book', BookShema);
