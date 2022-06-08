import { CLOSE_DIALOG, CLOSE_PROGRESS, OPEN_DIALOG, OPEN_PROGRESS, SET_COUNTRY_LIST } from "../actions/common.action";

const initialState = {
  openDialog: false,
  message: "",
  messageType: "Confirmation",
  progress: false,
  countryList: [{
    "locale": "en-US",
    "countryName": "English(US)"
},
{
    "locale": "en-AU",
    "countryName": "English(Australia)"
}]
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
    case OPEN_PROGRESS:
      return({
        ...state,
        progress: true
      });
    case CLOSE_PROGRESS:
      return({
        ...state,
        progress: false
      });
    case SET_COUNTRY_LIST:
      console.log("action.countryList=", action.countryList);
      return({
        ...state,
        countryList: action.countryList
      });
    default: return({
      ...state
    });
  }
}