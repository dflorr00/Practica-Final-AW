import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  TextField,
  IconButton,
  Box
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { deleteGroup, getUserGroups, createGroup, joinUserGroup, getGroupUsers, leaveUserGroup, getUserInfo } from "../server/communication";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function GroupList(props) {
  const [owner, setOwner] = useState(false);
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function setOwnerAux() {
      var user = await getUserInfo(cookies.get("user"));

      if (String(props.group.groupowner) === String(user._id)) {
        setOwner(true);

      }
    }

    if (props.group) {
      setOwnerAux();
      var users = props.group.users;
      users = users.map((item) => {
        var username;
        if (item.user) {
          username = item.user.username;
        } else {
          username = "";
        }
        return (
          <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "#BF0202" }} />
            </ListItemIcon>
            <ListItemText primary={username} />
          </ListItem>
        );
      });
    }
    setUserList(users);
  }, [props]);

  const handleClick = (e) => {
    setOpen(!open);
  };

  const leaveGroup = async (event) => {
    console.log("pressed LEAVE group button");
    event.preventDefault();
    var groupId = props.group.groupname;
    var groupOwner = props.group.groupowner;
    var user = await getUserInfo(cookies.get("user"));
    if (String(groupOwner) === String(user._id)) {
      await deleteGroup(groupId);
    } else {
      await leaveUserGroup(groupId, user._id);
    }
  };

  const removeGroup = async (event) => {
    console.log("pressed REMOVE group button");
    event.preventDefault();
    var groupId = props.group.groupname;
    var userId = cookies.get('user');
    await deleteGroup(groupId);
  };

  return (
    <List sx={{ pl: 4 }}>
      <ListItemButton onClick={handleClick} sx={{ display: 'flex' }}>
        <ListItemIcon>
          <GroupIcon sx={{ color: "#BF0202" }} />
        </ListItemIcon>
        <ListItemText primary={props.group.groupname} />
        {open ? <ExpandLess /> : <ExpandMore />}

      </ListItemButton>
      <IconButton ><ExitToAppIcon onClick={leaveGroup} /></IconButton>
      {owner ? <IconButton ><DeleteIcon onClick={removeGroup} /></IconButton> : null}



      <Collapse in={open} timeout="auto" unmountOnExit>
        {userList}
      </Collapse>
    </List>
  );
}

export default function GroupsList(props) {
  const [groupList, setGroupList] = useState([]);
  const [groupname, setGroupName] = useState([""]);
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("none");
  const username = cookies.get('user');
  const type = cookies.get('type');


  useEffect(() => {
    async function setGroups() {
      var groups = await getUserGroups(username);
      if (groups) {
        groups = groups.map((group) => {
          return <GroupList group={group} />;
        });
        setGroupList(groups);
      }
    }

    if (type === "premium") {
      setDisplay("block");
      setGroups();
    } else if (type === "standard") {
      setDisplay("none");
    }
  }, [type, username]);

  const handleClick = (e) => {
    setOpen(!open);
  };

  const setNewGroup = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var groupname = data.get("groupname");
    if (await getGroupUsers(groupname)) {
      joinUserGroup(groupname, username);
    } else {
      createGroup(groupname, username);
    }

    var groups = await getUserGroups(username);
    if (groups) {
      groups = groups.map((group) => {
        return <GroupList group={group} />;
      });
      setGroupList(groups);
    }


  }

  return (
    <List sx={{ display: { display } }}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GroupsIcon sx={{ color: "#BF0202" }} />
        </ListItemIcon>
        <ListItemText primary="Grupos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open && props.canOpen} timeout="auto" unmountOnExit>
        {groupList}
        <ListItem>
          <ListItemText primary={
            <Box sx={{ display: 'flex' }} component="form" onSubmit={setNewGroup}>
              <TextField size="small" label="Nuevo Grupo" name="groupname" value={groupname} onChange={(e) => { setGroupName(e.target.value) }} />
              <IconButton type="submit" ><AddBoxIcon fontSize="large" sx={{ justifyContent: "center", color: "#BF0202" }} /></IconButton>
            </Box>
          } />
        </ListItem>
      </Collapse>
    </List>
  );
}
