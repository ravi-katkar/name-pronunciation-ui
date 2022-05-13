import {SET_LOGIN_USER} from '../actions/user.entitlement.action';
const initialState = {
    loggedIn: false
}
const userEntitlementReducer = (state = {...initialState}, action) => {
    console.log("user details in reducer=", action);
    switch(action.type){
        case SET_LOGIN_USER:
            return {
                ...state, 
                uid: action.uid,
                empId: action.empId,
                firstName: action.firstName,
                middleName: action.middleName,
                lastName: action.lastName,
                preferredName: action.preferredName,
                isPreferredNameChosen: action.isPreferredNameChosen,
                emailId: action.emailId,
                entitlement: action.entitlement,
                loggedIn: true }
        default: return {...state}
    }
}
export default userEntitlementReducer;