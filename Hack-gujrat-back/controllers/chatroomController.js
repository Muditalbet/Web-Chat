const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res)=>{
    const {name} = req.body;
    const nameregex = /^[A-Za-z\S]+$/;
    if(!nameregex.test(name)) throw "Chatroom name can contaon only alphabets!";
    const chatroomExists = await Chatroom.findOne({name});
    if(chatroomExists) throw "Chatroom already created";
    else{
        const chatroom = new Chatroom({
            name,
        })
        await chatroom.save();
        res.json({
            message:"Chatroom created sucessfully!!"
        })
    }
}

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
    return res.json(chatrooms);
};