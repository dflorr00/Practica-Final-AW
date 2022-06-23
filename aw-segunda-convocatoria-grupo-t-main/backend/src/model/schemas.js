const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: Schema.Types.String,
    surname: Schema.Types.String,
    username: Schema.Types.String,
    password: Schema.Types.String,
    email: Schema.Types.String,
    image: { type: Schema.Types.ObjectId, ref: "File" },
    type: {type: Schema.Types.String, enum:["premium", "standard"]},
    creation_date: Schema.Types.Date,
    lastModify_date: Schema.Types.Date,
});

const Message = new Schema({
    issue: Schema.Types.String, // Asunto
    body: Schema.Types.String,
    send_date: Schema.Types.Date,
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    creation_date: Schema.Types.Date,
    lastModify_date: Schema.Types.Date,
});

const File = new Schema({
    filename: Schema.Types.String,
    data: Schema.Types.Buffer,
    ext: Schema.Types.String,
    creation_date: Schema.Types.Date,
    lastModify_date: Schema.Types.Date,
});

const Group = new Schema({
    groupname: Schema.Types.String,
    groupowner: {type: Schema.Types.ObjectId, ref: "User"},
    users: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    creation_date: Schema.Types.Date,
    lastModify_date: Schema.Types.Date,
})


module.exports = {
    user_schema: User,
    message_schema: Message,
    file_schema: File,
    group_schema: Group
};