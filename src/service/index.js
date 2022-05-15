import axios from "axios";
export const baseURL = "http://localhost:9080/namePronounciation";


export const get = path => axios.get(baseURL.concat(path));
export const post = (path, payload) => {
  console.log("in service post.......", path , "==", payload);
  const promise = new Promise((resolve, reject) => {
    axios.post(baseURL.concat(path), payload)
    .then(results => {
      console.log("results in post: ", results);
      resolve(results);
    })
    .catch(error => {console.log("error in post service........", error); reject(error)});
    });
  return promise;

}

export const postFile = (path, file, payload) => {
  console.log("postFile in service......");
  const promise = new Promise((resolve,reject) => {
    const formData = new FormData();
    formData.set("file", file, "1159312896.mp3");
    formData.set("data", JSON.stringify(payload));
    const headers = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
    axios.post(baseURL.concat(path), formData, headers)
    .then(result => {
      console.log("success........", result);
      resolve(result);
    })
    .catch(error => {
      console.log("error......", error);
      reject(error);
    })

  });
  return promise;
}