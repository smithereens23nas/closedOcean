const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name can not be empty']
    },
    author: {
        type: String,
        required: [true, 'please enter name of the author.']
    },
    price: {
        type: Number,
        min: [0, 'you can not add a negative number'],
        required: [true, 'price can not be empty'],
    },
    image: {
        type: String,
        required: [true, "image can not be empty"],
    },
    description: {
        type: String,
    }
});

const nft = mongoose.model("Nft", nftSchema);
module.exports = nft;
