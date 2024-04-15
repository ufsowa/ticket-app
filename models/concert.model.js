// {
//     "id": 1,
//     "performer": "John Doe",
//     "genre": "Rock",
//     "price": 25,
//     "day": 1,
//     "image": "/img/uploads/1fsd324fsdg.jpg"
//   },

const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    performer: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    day: { type: Number, required: true },
    image: { type: String, required: true },    
    workshops: { type: Array, required: true},

});

module.exports = mongoose.model('Concert', concertSchema);