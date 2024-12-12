import User from "../models/user.modal.js";
import Message from "../models/message.modal.js";
import cloudinary from "../lib/cloudinary.js";
// This is a typical use case for social media applications or chat applications where you want to display a list of users but exclude the currently logged-in user from that list.

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const FilteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(FilteredUser);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get messages between two different users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// send messages between two different users
//sends the text in the form of user or messages

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    // senderId is me

    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    //handle this image Case

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: realtime functionalities goeshere => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessageController:", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
