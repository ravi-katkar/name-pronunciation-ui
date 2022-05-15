import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DIALOG } from "../redux/actions/common.action";

export const Feedback = () => {
  const dispatch = useDispatch();
  const {open, message, messageType} = useSelector(state=> {
    const stateObj = state.common;
    return({
      open: stateObj.openDialog,
      message: stateObj.message,
      messageType: stateObj.messageType
    });
  });
  const handleClose = () => {
    dispatch({
      type: CLOSE_DIALOG
    })
  }

  return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {messageType}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
  );
}