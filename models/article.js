const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        const regExp = /^((http|https):\/\/)(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]+)([a-zA-Z0-9$%?/.-]+)?(#)?$/;
        return regExp.test(str);
      },
      message: 'Введите ссылку',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(str) {
        const regExp = /^((http|https):\/\/)(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]+)([a-zA-Z0-9$%?/.-]+)?(#)?$/;
        return regExp.test(str);
      },
      message: 'Введите ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
