const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const uri = process.env.MONGODB_URI || config.get("mongodb_uri");
const {
  user_schema,
  message_schema,
  file_schema,
  group_schema,
} = require("./schemas");

const dbconnection = mongoose.createConnection(uri);
const User = dbconnection.model("User", user_schema);
const Message = dbconnection.model("Message", message_schema);
const File = dbconnection.model("File", file_schema);
const Group = dbconnection.model("Group", group_schema);
const ObjectId = mongoose.Types.ObjectId;

async function createFile(filename, data, ext) {
  var date = new Date().getTime();
  var file = new File({
    filename: filename,
    data: data,
    ext: ext,
    creation_date: date,
    lastModify_date: date,
  });

  await file.save();
  return file._id;
}

async function getFileByName(file_name) {
  const queryfile = await File.findOne({
    $or: [
      {
        filename: file_name,
      },
    ],
  }).lean();

  return queryfile;
}

async function getFileById(file_id) {
  const queryfile = await File.findOne({
    $or: [
      {
        _id: file_id,
      },
    ],
  }).lean();

  return queryfile;
}

async function removeFile(file_id) {
  await File.findByIdAndDelete(file_id);
}

async function createUser(username, password, email, name, surname, type) {
  var salt = await bcrypt.genSalt(Number.parseInt(config.get("saltRounds")));
  password = await bcrypt.hash(password, salt);
  try_username1 = await getUser(username);
  try_username2 = await getUser(email);
  var date = new Date().getTime();
  if (_.isEmpty(try_username1) && _.isEmpty(try_username2)) {
    var new_user = new User({
      username: username,
      password: password,
      email: email,
      name: name,
      surname: surname,
      image: null,
      type: type,
      creation_date: date,
      lastModify_date: date,
    });
    await new_user.save(new_user);
    return true;
  } else {
    return false;
  }
}

async function getUser(userIdentification) {
  var queryuser = await User.findOne({
    $or: [{ username: userIdentification }, { email: userIdentification }],
  })
    .populate({
      path: "image",
      options: {
        lean: true,
      },
    })
    .lean();

  if (queryuser === null) {
    // Find by id
    try {
      queryuser = await User.find({
        _id: userIdentification,
      })
        .populate({
          path: "image",
          options: {
            lean: true,
          },
        })
        .lean();
    } catch (error) {
      console.log(error);
    }
  }
  return queryuser;
}

async function editUser(
  user,
  newUsername,
  name,
  surname,
  email,
  password,
  image
) {
  const queryuser = await User.findOne({
    $or: [
      {
        username: user,
      },
      {
        email: email,
      },
    ],
  });

  if (queryuser) {
    if (newUsername) {
      queryuser.username = newUsername;
    }
    if (name) {
      queryuser.name = name;
    }
    if (surname) {
      queryuser.surname = surname;
    }
    if (email) {
      queryuser.email = email;
    }
    if (password) {
      var salt = await bcrypt.genSalt(
        Number.parseInt(config.get("saltRounds"))
      );
      queryuser.password = await bcrypt.hash(password, salt);
    }
    if (image) {
      queryuser.image = image;
    }
    var date = new Date().getTime();
    queryuser.lastModify_date = date;
    await queryuser.save(queryuser);
    return true;
  } else {
    return false;
  }
}

async function testUser(userIdentification, password) {
  const queryuser = await getUser(userIdentification);
  if (!_.isEmpty(queryuser)) {
    if (await bcrypt.compare(password, queryuser.password)) {
      return queryuser;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

async function getGroups(member) {
  var groups = [];
  var member = await getUser(member);

  const querygroups = await Group.find({}).populate({
    path: "users.user",
    options: {
      lean: true,
    },
  });

  querygroups.forEach(async (group) => {
    var result = group.users.filter((user) => {
      return String(user.user._id) === String(member._id);
    });

    if (result.length > 0) {
      // Remove password from users in group
      group.users.forEach((user) => {
        if (!_.isEmpty(user)) {
          if (!_.isEmpty(user.user)) {
            delete user.user.password;
          }
        }
      });
      groups.push(group);
    }
  });
  return groups;
}

async function createGroup(groupname, firstMember) {
  var users = [];
  firstMember = await getUser(firstMember);
  var date = new Date().getTime();
  if (!_.isEmpty(firstMember)) {
    users.push({
      user: firstMember._id,
    });
    var new_group = new Group({
      groupname: groupname,
      groupowner: firstMember,
      users: users,
      creation_date: date,
      lastModify_date: date,
    });
    await new_group.save(new_group);
    return true;
  }
  return false;
}

async function joinGroup(groupname, newMember) {
  try {
    newMember = await getUser(newMember);
    let id = newMember._id;
    const group = await Group.findOne({
      groupname: groupname,
      "users.user": { $ne: newMember._id },
    }).populate("users.user");

    if (group) {
      group.users.push({
        user: newMember._id,
      });
      var date = new Date().getTime();
      group.lastModify_date = date; 
      await group.save(group);
    }
    return true;
  } catch (error) {
    return false;
  }
}
async function leaveGroup(groupname, userIdentification) {
  const member = await getUser(userIdentification);
  var data = {};
  const querygroup = await Group.findOne({
    groupname: groupname,
  }).populate({
    path: "users.user",
    options: {
      lean: true,
    },
  });

  var userInGroup = querygroup.users.filter((user) => {
    return String(user.user._id) === String(member._id);
  });

  if (userInGroup.length == 0) {
    data["code"] = 400;
    data["message"] = "User not in group";
    return data;
  }

  // Remove user from group
  querygroup.users = querygroup.users.filter((user) => {
    return String(user.user._id) !== String(member._id);
  });
  var date = new Date().getTime();
  group.lastModify_date = date;
  await querygroup.save(querygroup);
  data["code"] = 200;
  data["message"] = "User left group";
  return data;
}

async function deleteGroup(groupname) {
  const querygroup = await Group.findOne({
    groupname: groupname,
  });
  await querygroup.remove();
}

async function getGroupUsers(groupname) {
  const queryusers = await Group.findOne({
    groupname: groupname,
  })
    .populate({
      path: "users.user",
      options: {
        lean: true,
      },
    })
    .lean();

  // Remove password from users
  if (!_.isEmpty(queryusers)) {
    queryusers.users.forEach((user) => {
      delete user.user.password;
    });
    return queryusers.users;
  } else {
    return null;
  }
}

async function createMessage(issue, body, sender, receiver) {
  var auxReceiver = receiver;
  let receivers = [];
  var sender = await getUser(sender);
  var receiver = await getUser(receiver);
  var date = new Date().getTime();

  if (_.isEmpty(receiver)) {
    receivers = await getGroupUsers(auxReceiver);
    receivers.forEach(async (dest) => {
      if(String(dest.user) !== String(sender._id)){
        var new_message = new Message({
          issue: issue,
          body: body,
          send_date: date,
          sender: sender._id,
          receiver: dest.user,
          creation_date: date,
          lastModify_date: date,
        });
        await new_message.save(new_message);
      }
    });
  } else {
    var new_message = new Message({
      issue: issue,
      body: body,
      send_date: date,
      sender: sender._id,
      receiver: receiver._id,
    });
    await new_message.save(new_message);
  }

  
}

async function getMessagesReceived(userIdentification) {
  // Obtiene los mensajes enviados al usuario loggeado
  var user = await getUser(userIdentification);
  const messages = await Message.find({
    receiver: user._id,
  })
    .populate({
      // Populate sender and receiver
      path: "sender",
      options: {
        lean: true,
      },
    })
    .populate({
      path: "receiver",
      options: {
        lean: true,
      },
    })
    .lean();

    if(!_.isEmpty(messages)){
      messages.forEach((message) => {
        delete message.sender.password;
        delete message.receiver.password;
      });
    }
  // Remove password from users
  

  return messages;
}

async function getMessagesSent(userIdentification) {
  // Obtiene los mensajes enviados por el usuario loggeado
  var sender = await getUser(userIdentification);
  const message = await Message.find({
    sender: sender._id,
  })
    .populate({
      // Populate sender and receiver
      path: "sender",
      options: {
        lean: true,
      },
    })
    .populate({
      path: "receiver",
      options: {
        lean: true,
      },
    })
    .lean();
  // Eliminar contraseñas
  message.forEach(async (message) => {
    delete message.receiver.password;
    delete message.sender.password;
  });

  return message;
}

module.exports = {
  createFile: createFile,
  getFileById: getFileById,
  getFileByName: getFileByName,
  removeFile: removeFile,
  createUser: createUser,
  getUser: getUser,
  testUser: testUser,
  createMessage: createMessage,
  getMessagesReceived: getMessagesReceived,
  getMessagesSent: getMessagesSent,
  editUser: editUser,
  createGroup: createGroup,
  getGroups: getGroups,
  joinGroup: joinGroup,
  getGroupUsers: getGroupUsers,
  leaveGroup: leaveGroup,
  deleteGroup: deleteGroup,
};
