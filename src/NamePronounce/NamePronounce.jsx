import { Box, Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Select, TextField, Typography, Option, FormControl, InputLabel, MenuItem, FormLabel, RadioGroup, Radio } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecordAudio from "../Audio/RecordAudio.js";
import Record from "../Record/Record.jsx";
import { getStandardPronunciation, uploadAudio } from "../redux/actions/custom.audio.action.js";
import CampaignIcon from '@mui/icons-material/Campaign';
import { styled } from '@mui/material/styles';
import { baseURL } from "../service/index.js";
import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';
import { updateEmployee } from "../redux/actions/search.action.js";
import { CONFIRMATION, ERROR, SUCCESS } from "../common/constants.js";
import { getCountryList, openDialog } from "../redux/actions/common.action.js";
import { setUserDetails } from "../redux/actions/user.entitlement.action.js";

const NamePronounce = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userEntitlement.user);
  const countryList = useSelector(state => state.common.countryList) || [];
//   const countryList= [{
//     "locale": "en-US",
//     "countryName": "English(US)"
// },
// {
//     "locale": "en-AU",
//     "countryName": "English(Australia)"
// },]
  console.log("countryList==", countryList);
  const [preferredName, setPreferredName] = useState(user.preferredName);
  const [mode, setMode] = useState("default");
  const [updatePrefName, setUpdatePrefName] = useState(false);
  const [blobObj, setBlobObj] = useState("");
  const [refresh, setRefresh] = useState("");
  const [country, setCountry] = useState(user.locale || "en-US");
  const [gender, setGender] = useState(user.genderVoice || "FEMALE");
  const preferredNameRef = useRef();
  const handleClose = () => {
    setMode("default");
  }
  useEffect(()=>{
    getCountryList()
    .then(countryListAction => {
      dispatch(countryListAction);
    })
  }, []);
  // useEffect(()=>{
  //   console.log("in useEffect.......");
  //   getStandardPronunciation("raghava")
  //   .then(response => {
  //     console.log("after response in useEffect....", response);
  //     // const blob = new Blob([response], { type: 'audio/mp3' });
  //     const str = JSON.stringify(response);
  //     const bytes = new TextEncoder().encode(str);
  //     const blob = new Blob([str], {
  //       type: "application/octet-stream"
  //   });
  //   console.log("blob::::::::", blob);
  //     const url = window.URL.createObjectURL(blob);
  //     setBlobObj(url);
  //   })

  // },[]);
  const audioSrc = "blob:"+blobObj;
  console.log("audio src=", blobObj);
  // const openDialog = (mode === "custom");
  const pronunciationURL = () => {
    const blobObj = "";
    let url = baseURL+"/getNamePronunciation/"+user.uid;
    if(mode==="standard"){
      let name=preferredName;
      if(!preferredName){
        name = user.firstName;
        if(user.lastName){
          name.append(" ").append(user.lastName);
        }
      }

      url = baseURL+"/synthesize?inputText="+name+"&locale="+country+"&gender="+gender;
    }else{
      url = baseURL+"/getNamePronunciation/"+user.uid;
    }
    return url;
  };

  const standardUpload = () => {
    console.log("download1");
    // let audio = document.querySelector("audio");

    console.log("download2", audio);
    let blob = audio.getBlob();
    console.log("download3");
    let file = new File([blob], getFileName('mp3'), {
        type: 'audio/mp3'
    });
    console.log("download3");
    // RecordRTC.invokeSaveAsDialog(file);
    console.log("download4");
    uploadAudio(file,{
        "uid": props.uid,
        "format": "audio/mpeg",
        "createdBy":"SYSTEM"
    });
    props.handleClose();
    props.setMode("default");
    console.log("download5");
  };

  function getFileName(fileExtension) {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    return 'RecordRTC-' + year + month + date + '-' + d.getUTCMilliseconds() + '.' + fileExtension;
  }

    return(
      <div>
        <h2>Customize Name Pronunciation</h2>
        <div>
          <p>To update the preferred name, select “Update Preferred Name” and click on “GET STANDARD PRONUNCIATION” to listen standard pronunciation and select “SAVE”.</p>
          <p>To override the existing name pronunciation, Select “UPDATE PRONUNCIATION (RECORD NEW VOICE)” button and record your voice.</p>
        </div>

        <Box sx={{ borderRadius: 1, border:1, padding:2,'& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        <TextField name="uid" value={user.uid} disabled label="User ID" />
        <TextField name="firstName" value={user.firstName} disabled label="First Name" />
        <TextField name="middleName" value={user.middleName} disabled label="Middle Name" />
        <TextField name="lastName" value={user.lastName} disabled label="Last Name" />
        <TextField name="emailId" value={user.emailId} disabled label="Email" />
        <TextField
          name="preferredName"
          value={preferredName}
          disabled={!updatePrefName}
          label="Preffered Name"
          onChange={({target}) => setPreferredName(target.value)}
          ref={preferredNameRef}
        />
        <FormControlLabel
          control={<Checkbox
            name="updatePrefName"
            checked={updatePrefName}
            onClick={({target})=>{
              setUpdatePrefName(target.checked);
              if(target.checked){
                console.log(preferredNameRef.current);
                preferredNameRef.current && preferredNameRef.current.focus();
              }

            }}
            />}
          label="Update Preferred Name"
        />
        {updatePrefName &&
        <div style={{paddingTop: "1rem", paddingLeft:"0.5rem"}}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={({target}) => setCountry(target.value)}

          >
            {
              countryList.map((obj,i)=>{
                return <MenuItem key={i} value={obj.locale}>{obj.countryName}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl style={{paddingLeft:"1rem"}}>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={gender}
            onChange={({target}) => setGender(target.value)}

          >
            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        </div>
        }

          {updatePrefName &&
          <div style={{paddingTop: "1rem", paddingLeft:"0.5rem"}}>
            <Button
              variant="contained"
              onClick={() => {
                setMode("standard");
                setUpdatePrefName(false);
              }}
            >
              Get Standard Pronunciation
            </Button>
          </div>}

      </Box>
      <br />
      { !(mode==="custom" || updatePrefName) &&
      <Box sx={{ borderRadius: 1, border:1, padding:2,'& .MuiTextField-root': { m: 1, width: '25ch' } }}>
        {!(mode === "standard") &&
        <div style={{display: "flex", paddingBottom: "2rem"}}>
          <Typography component="span" style={{paddingRight: "6rem"}}>
            Phonetic
          </Typography>
          &nbsp;
          <Typography component="span" style={{background: "gainsboro"}}>
           {user.phonetic}
          </Typography>

        </div>}
        <div style={{display: "flex"}}>
          <Typography>
            Pronounciation
            <CampaignIcon />
          </Typography>

          <div style={{paddingLeft: "2rem"}}>
            <audio controls autoPlay playsInline>
              <source src={pronunciationURL()} type="audio/mp3"></source>
            </audio>
          </div>
          &nbsp;
          &nbsp;
          <Button
            variant="contained"
            onClick={() => {setMode("custom")}}
          >
            Update Pronunciation (Record new voice)
          </Button>

        </div>
      </Box>}
      &nbsp;
      <div>
        {mode === "standard" && !updatePrefName &&
          <Button
            variant="contained"
            onClick={()=> {
            updateEmployee({
              "uid": user.uid,
              "empId": user.empId,
              "firstName": user.firstName,
              "preferredName": preferredName,
              "entitlement": user.entitlement,
              "createdBy": "SYSTEM",
              "genderVoice": gender,
              "locale": country,
              "lastName": user.lastName,
              "emailId": user.emailId,
              "middleName": user.middleName
            })
            .then(response => {
              if(response === SUCCESS){
                dispatch(setUserDetails(user.uid));
                dispatch(openDialog("Updated Successfully", CONFIRMATION));
                setMode("default");
              }
            })
            .catch(error=>{
              dispatch(openDialog("Something went wrong! Unable to save data", ERROR));
            })
          }
          }
            endIcon={<SaveIcon />}
          >
            Save
          </Button>
        }
      </div>

      <BootstrapDialog open={(mode==="custom")} onClose={handleClose} disableEscapeKeyDown={true}>
        <BootstrapDialogTitle>Voice Recorder</BootstrapDialogTitle>
        <DialogContent>
          <RecordAudio
            uid={user.uid}
            handleClose={handleClose}
            setMode={setMode}
            preferredName={preferredName}
            refreshPage={(arg) => {
              setRefresh(arg)
            }}
          />
        </DialogContent>

      </BootstrapDialog>
      {
        refresh && <></>
      }
      </div>

    );
}
export default NamePronounce;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};