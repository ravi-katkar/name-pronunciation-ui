import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../../common/constants";
import { get } from "../../service";

export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const setLoginUser = (user) => {
    console.log("user data in setLoginUser=", user);
    return({
    type: SET_LOGIN_USER,
    uid: user.uid,
    empId: user.empId,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    preferredName: user.preferredName,
    isPreferredNameChosen: user.isPreferredNameChosen,
    emailId: user.emailId,
    entitlement: user.entitlement
})};

export const login = userid => dispatch => {
    get("/employee/".concat(userid))
    .then(results => {
        dispatch(setLoginUser({...results.data.data}));
    });
    
    // dispatch(setLoginUser({uid:userid, entitlement:ROLE_ADMIN}));
    
}