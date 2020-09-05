const mongoose = require('mongoose');
const Chatroom = mongoose.model('Message');


exports.getMessages = async (req, res) => {
    const{ id } = req.body
    const messages = await Chatroom.find({chatroom:id});
    return res.json(messages);
};