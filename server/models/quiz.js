const mongoDB = require('mongoose');

const optionSchema = mongoDB.Schema({
  value1: String,
  value2: String
});

const questionSchema = mongoDB.Schema({
  question: {
    type: String,
    required: true
  },
  optionType: {
    type: String,
    required: true,
    enum: ['text', 'image', 'textImage']
  },
  options: [optionSchema],
  correctAnswer: Number,
  timer: {
    type: String,
  }   
})

const quizSchema = mongoDB.Schema({
  quizName: {
    type: String,
    required: true
  },
  quizType: {
    type: String,
    required: true,
    enum: ['poll_type', 'quiz_type']
  },
  questions: [questionSchema] ,
  CreatedAt:{
    type: String
  },
  impressions:{
    type: Number,
    default: 0
  },
   
})

module.exports = mongoDB.model('quiz', quizSchema);