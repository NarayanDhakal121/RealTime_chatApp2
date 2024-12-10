import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    SenderId: {
      type: String,
      required: true,
      unique: true,
    },
    ReceiverId: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.modelNames("Message", messageSchema);
export default Message;
