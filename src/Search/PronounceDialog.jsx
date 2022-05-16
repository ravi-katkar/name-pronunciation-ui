import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";

export const PronounceDialog = props =>{

  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle> */}
      <DialogContent>
        <div>
          <div style={{display: "flex", paddingBottom: "2rem"}}>
            <Typography component="span" style={{paddingRight: "2rem"}}>Phonetic: </Typography>
            <Typography component="span" style={{background: "gainsboro"}}>{props.phonetic}</Typography>
          </div>
          <div style={{display: "flex"}}>
            {/* <Typography component="span">Pronunciation</Typography> */}
            <audio key={props.uid} controls autoPlay playsInline>
              <source src={props.url} type="audio/mp3" />
            </audio>
          </div>
        </div>
        {/* <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
