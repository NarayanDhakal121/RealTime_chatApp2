import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    unique: true,
  },
});

const Message = mongoose.modelNames("Message", messageSchema);
export default Message;
