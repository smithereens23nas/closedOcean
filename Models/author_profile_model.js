const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  image: [ {
    type: String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }],
  name: {
    type: String,
    required: [true, "Please Enter a Valid Username."]
  },
  description: {
      type: String,
      required: [true, "Tell us about yourself and work."]
  }
});

const author = mongoose.model('Author', authorSchema);
module.exports = author;