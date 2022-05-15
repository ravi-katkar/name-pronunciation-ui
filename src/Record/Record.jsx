import React from 'react';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

class Record extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      audioDetails: {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        }
      }
  }

  handleAudioStop(data){
      console.log(data)
      this.setState({ audioDetails: data });
  }

  handleAudioUpload(file) {
      console.log(file);
  }

  handleCountDown(data) {
      console.log(data);
  }

  handleReset() {
      const reset = {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      };
      this.setState({ audioDetails: reset });
    }

    render(){
      return(
        <Recorder
          record={true}
          title={"New recording"}
          audioURL={this.state.audioDetails.url}
          showUIAudio
          handleAudioStop={data => this.handleAudioStop(data)}
          handleAudioUpload={data => this.handleAudioUpload(data)}
          handleCountDown={data => this.handleCountDown(data)}
          handleReset={() => this.handleReset()}
          mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
        />
      );
    }
}
export default Record;