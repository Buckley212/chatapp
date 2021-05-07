const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
    post: String,
    reaction: { type: String, default: '' }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
