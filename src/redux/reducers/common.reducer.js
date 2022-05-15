import { CLOSE_DIALOG, OPEN_DIALOG } from "../actions/common.action";

const initialState = {
  openDialog: false,
  message: "",
  messageType: "Confirmation"
}
export const commonReducer = (state={}, action) => {
  switch(action.type){
    case OPEN_DIALOG:
      return({
        ...state,
        openDialog: true,
        message: action.message,
        messageType: action.messageType
      });
    case CLOSE_DIALOG:
      return({
        ...state,
        openDialog: false,
        message: ""
      });
    default: return({
      ...state
    });
  }
}