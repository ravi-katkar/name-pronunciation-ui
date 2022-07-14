import { Box, Button, Checkbox, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAudio } from "../redux/actions/custom.audio.action";
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import UploadIcon from '@mui/icons-material/Upload';
import { flexbox } from "@mui/system";
import { CONFIRMATION, ERROR, SUCCESS } from "../common/constants";
import { openDialog } from "../redux/actions/common.action";
const RecordRTC = require("./recordRTC");

let microphone;
let recorder;
let audio;
const RecordAudio = (props) => {

  const dispatch = useDispatch();
  const [startBtnDisabled, setStartButtonDisabled] = useState(false);
  const [stopBtnDisabled, setStopBtnDisabled] = useState(true);
  const [relMicBtnDisabled, setRelMicBtnDisabled] = useState(true);



  if(!audio){
    document.querySelector('audio');
  }
  console.log("audio.......", audio);
  var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const startRecording = () => {
    console.log("btnStartRecording.onclick");
    setStartButtonDisabled(true);
    // this.style.border = '';
    // this.style.fontSize = '';
    console.log("microphone=", microphone);
    if (!microphone) {
      console.log("1");
      captureMicrophone(function(mic) {
            microphone = mic;

            if(isSafari) {
                replaceAudio();

                audio.muted = true;
                audio.srcObject = microphone;

                btnStartRecording.disabled = false;
                btnStartRecording.style.border = '1px solid red';
                btnStartRecording.style.fontSize = '150%';

                alert('Please click startRecording button again. First time we tried to access your microphone. Now we will record it.');
                return;
            }


            startRecording(); ////click(btnStartRecording);
        });
        return;
    }
console.log("2");
    replaceAudio();
console.log("3");
    audio.muted = true;
    audio.srcObject = microphone;

    const options = {
        type: 'audio',
        numberOfAudioChannels: isEdge ? 1 : 2,
        checkForInactiveTracks: true,
        bufferSize: 16384
    };

    if(isSafari || isEdge) {
        options.recorderType = StereoAudioRecorder;
    }

    if(navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
        options.sampleRate = 48000; // or 44100 or remove this line for default
    }

    if(isSafari) {
        options.sampleRate = 44100;
        options.bufferSize = 4096;
        options.numberOfAudioChannels = 2;
    }
    console.log("4");
    if(recorder) {
        recorder.destroy();
        recorder = null;
    }
    console.log("5");
    recorder = RecordRTC(microphone, options);
    console.log("6");
    recorder.startRecording();
    console.log("7");
    setStopBtnDisabled(false);
    // btnDownloadRecording.disabled = true;
    console.log("end start recording click......");
  }

  const stopRecording = () => {
    setStopBtnDisabled(true);
    console.log("st1=", recorder);
    recorder.stopRecording(stopRecordingCallback);
  };

  const stopRecordingCallback = () => {
    replaceAudio(URL.createObjectURL(recorder.getBlob()));

    setStartButtonDisabled(false);

    setTimeout(function() {
        if(!audio.paused) return;

        setTimeout(function() {
            if(!audio.paused) return;
            audio.play();
        }, 1000);

        audio.play();
    }, 300);

    audio.play();

    //btnDownloadRecording.disabled = false;

    if(isSafari) {
      releaseMicrophone(); ////  click(btnReleaseMicrophone);
    }
  }

  const releaseMicrophone = () => {
    setRelMicBtnDisabled(true);
    setStartButtonDisabled(false);

    if(microphone) {
        microphone.stop();
        microphone = null;
    }

    if(recorder) {
        // click(btnStopRecording);
    }
  };

const captureMicrophone = (callback) => {
  setRelMicBtnDisabled(false);

  if(microphone) {
      callback(microphone);
      return;
  }

  if(typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
      alert('This browser does not supports WebRTC getUserMedia API.');

      if(!!navigator.getUserMedia) {
          alert('This browser seems supporting deprecated getUserMedia API.');
      }
  }

  navigator.mediaDevices.getUserMedia({
      audio: isEdge ? true : {
          echoCancellation: false
      }
  }).then(function(mic) {
      callback(mic);
  }).catch(function(error) {
      alert('Unable to capture your microphone. Please check console logs.');
      console.error(error);
  });
}

  const click =(el)=> {
    el.disabled = false; // make sure that element is not disabled
    let evt = document.createEvent('Event');
    evt.initEvent('click', true, true);
    el.dispatchEvent(evt);
  }

  const replaceAudio = (src) => {
    let newAudio = document.createElement('audio');
    newAudio.controls = true;
    newAudio.autoplay = true;

    if(src) {
        newAudio.src = src;
    }
    audio = document.querySelector('audio');
    let parentNode = audio.parentNode;
    parentNode.innerHTML = '';
    parentNode.appendChild(newAudio);

    audio = newAudio;
  }

  const standardUpload = () => {
    // this.disabled = true;
    console.log("download1");
    if(!recorder || !recorder.getBlob()) return;

    if(isSafari) {
      console.log("isSafari=true....");
        recorder.getDataURL(function(dataURL) {
            SaveToDisk(dataURL, getFileName('mp3'));
        });
        return;
    }
    console.log("download2");
    let blob = recorder.getBlob();
    let file = new File([blob], getFileName('mp3'), {
        type: 'audio/mp3'
    });
    console.log("download3");
    RecordRTC.invokeSaveAsDialog(file);
    console.log("download4");
    uploadAudio(file,{});
    console.log("download5");
  };

  const customUpload = () => {
    // this.disabled = true;
    console.log("download1");
    if(!recorder || !recorder.getBlob()) return;

    if(isSafari) {
      console.log("isSafari=true....");
        recorder.getDataURL(function(dataURL) {
            SaveToDisk(dataURL, getFileName('mp3'));
        });
        return;
    }
    console.log("download2");
    let blob = recorder.getBlob();
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
        ,
        "preferredName": props.preferredName
    })
    .then(response=>{
      if(response.data.status===SUCCESS){
        props.refreshPage(new Date());
        dispatch(openDialog("Voice record uploaded successfully."), CONFIRMATION);
      }
    })
    .catch(error=>{
      dispatch(openDialog("Unable to upload voice record.", ERROR));
    })
    props.handleClose();
    props.setMode("default");
    console.log("download5");
  };

  function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        let save = document.createElement('a');
        save.href = fileURL;
        save.download = fileName || 'unknown';
        save.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(save);

        if (typeof save.click === 'function') {
            save.click();
        } else {
            save.target = '_blank';
            let event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
        }

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        let _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
  }

  function getFileName(fileExtension) {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    return 'RecordRTC-' + year + month + date + '-' + d.getUTCMilliseconds() + '.' + fileExtension;
  }

  return(
    <div>

      <Box sx={{ borderRadius: 1, border:1, padding:2, textAlign: "center" }}>
        <div>
          <audio controls autoPlay playsInline>
            {/* <source src="http://localhost:9080/namePronounciation/getNamePronunciation/u752502" type="audio/mpeg"></source> */}
          </audio>
        </div>

          <div>
            <Button
              disabled={startBtnDisabled}
              onClick={startRecording}
              endIcon={<MicIcon />}>Start Recording</Button>
            <Button
              disabled={stopBtnDisabled}
              onClick={stopRecording}
              endIcon={<StopIcon />}>Stop Recording</Button>
            {/* <Button
              disabled={relMicBtnDisabled}
              onClick={releaseMicrophone}>Release Microphone</Button> */}
            <Button onClick={customUpload} endIcon={<UploadIcon />}>Upload</Button>
          </div>

      </Box>



      {/* <div>
        <Button onClick={uploadAudio()}>Upload</Button>
      </div> */}
    </div>

  );

}
export default RecordAudio;