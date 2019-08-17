const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  //unless youll have more than one property defined you dont have to use this: {type: String}
  // firstName: {type: string}
  firstName: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  imageUrl: {
    type: String,
    default: "https://www.theinquirer.net/w-images/227e5a46-4c9e-4fd5-be3e-0e5bda7cc21b/2/emojiupdate20179-580x358.png"
  }
},{
    //keeps record when its created and updated
    timestamps: true
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;



