// {
//     "id": 1,
//     "author": "John Doe",
//     "text": "This company is worth every coin!"
//   },

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: { type: String, required: true },   // concert.performer ref: Concert 
    text: { type: String, required: true }
});

module.exports = mongoose.model('Testimonial', testimonialSchema); 