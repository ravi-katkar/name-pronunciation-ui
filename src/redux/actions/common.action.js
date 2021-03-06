import { doGet } from "../../service";
import {store} from "../store";

export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const OPEN_PROGRESS = "OPEN_PROGRESS";
export const CLOSE_PROGRESS = "CLOSE_PROGRESS";

export const openProgress = () =>{
  store.dispatch({
    type: OPEN_PROGRESS
  })
}

export const closeProgress = () => {
  store.dispatch({
    type: CLOSE_PROGRESS
  })
}

export const openDialog = (message, messageType) => ({
  type: OPEN_DIALOG,
  message,
  messageType
});

export const getAvatar = uid => {
  const promise = new Promise((resolve,reject)=>{
    doGet("/employeeAvatar/"+uid)
    .then(response=>{
      resolve(response.data.data.image)
    })
    .catch(error=>{
      reject(error);
    })
  });
  return promise;
}