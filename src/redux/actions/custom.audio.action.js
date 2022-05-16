import { SUCCESS } from "../../common/constants";
import { doPost, postFile } from "../../service";
export const uploadAudio = (file, data) => {
  const promise = new Promise((resolve,reject)=>{
    postFile("/NameSound", file, data)
    .then(response => {
    resolve(response);
    })
    .then(error=>{
      reject(error);
    })
  });
  return promise;

}

export const getStandardPronunciation = (name) => {
  const promise = new Promise((resolve, reject)=>{
    doPost("/synthesize1", {
      inputText: name
    }).then(response => {
      console.log("synthesize1 response=", response.data);
      resolve(response);
    })
  });
  return promise;
}