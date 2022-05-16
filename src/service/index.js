import axios from "axios";
import { closeProgress, openProgress } from "../redux/actions/common.action";
export const baseURL = "http://localhost:9080/namePronounciation";


export const doGet = path => axios.get(baseURL.concat(path));
export const doPost = (path, payload) => {
  openProgress();
  console.log("in service post.......", path , "==", payload);
  const promise = new Promise((resolve, reject) => {
    axios.post(baseURL.concat(path), payload)
    .then(results => {
      closeProgress();
      console.log("results in post: ", results);
      resolve(results);
    })
    .catch(error => {
      closeProgress();
      console.log("error in post service........", error); reject(error)});
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

export const doDelete = (path) => {
  console.log("in service doDelete.......", path);
  const promise = new Promise((resolve, reject) => {
    axios.delete(baseURL.concat(path))
    .then(results => {
      console.log("results in delete: ", results);
      resolve(results);
    })
    .catch(error => {console.log("error in delete service........", error); reject(error)});
    });
  return promise;
}

export const doPut = (path, payload) => {
  console.log("in service put.......", path , "==", payload);
  const promise = new Promise((resolve, reject) => {
    axios.put(baseURL.concat(path), payload)
    .then(results => {
      console.log("results in put: ", results);
      resolve(results);
    })
    .catch(error => {console.log("error in put service........", error); reject(error)});
    });
  return promise;
}