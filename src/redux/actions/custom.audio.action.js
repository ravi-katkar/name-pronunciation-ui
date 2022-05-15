import { doPost, postFile } from "../../service";
export const uploadAudio = (file, data) => {
  postFile("/NameSound", file, data);
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