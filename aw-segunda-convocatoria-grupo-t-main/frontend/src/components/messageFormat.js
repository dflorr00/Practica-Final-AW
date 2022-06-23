import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import React from "react";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function FormatMessage(props) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ListItemButton sx={{ minWidth: "100%" }} onClick={toggleOpen}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {props.issue}
          <br />
          <Typography variant="msg_sender">{props.sender}</Typography>
          <br />
          <Typography variant="msg_receiver">{props.receiver}</Typography>
          <br />
          <Typography variant="msg_date">{props.send_date}</Typography>
        </DialogTitle>
        <DialogContent>


          <DialogContentText id="alert-dialog-slide-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
      </Dialog>


      <ListItemIcon>
        <MarkEmailUnreadIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box>
            <Typography variant="msg_issue"> {props.issue}</Typography>
            <Typography>De:{props.sender}</Typography>
          </Box>

        }
      />
    </ListItemButton >
  );
}
