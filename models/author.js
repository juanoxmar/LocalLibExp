const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for Author's fullname
AuthorSchema.virtual('name').get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  let death;
  if (this.date_of_birth === undefined) {
    return '';
  }
  if (this.date_of_death === undefined) {
    death = '';
  } else {
    death = moment(this.date_of_death).format('MM/DD/YYYY');
  }
  return `${moment(this.date_of_birth).format('MM/DD/YYYY')} -
    ${death}`;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return moment(this.date_of_birth).format('MM/DD/YYYY');
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return moment(this.date_of_death).format('MM/DD/YYYY');
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
