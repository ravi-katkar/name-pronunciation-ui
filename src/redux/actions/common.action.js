import { doGet } from "../../service";

export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

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