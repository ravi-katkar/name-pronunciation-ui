import { SUCCESS } from "../../common/constants";
import { doDelete, doPost, doPut } from "../../service";

export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";

export const setSearchResults = searchResults => ({
    type: SET_SEARCH_RESULTS,
    searchResults
});
export const getSearchResults = searchCriteria => dispatch => {
    // const results= [
    //     {id: 1, uid: "u717171", empId: "12345", firstName: "Raghava", middleName: "Reddy", lastName:"Kotla", preferredName:"Raghava", emailId:"abc@xyz.com"},
    //     {id: 2, uid: "u123456", empId: "35324", firstName: "Ravi", middleName: "", lastName:"Katkar", preferredName:"Ravi", emailId:"123@xyz.com"}
    // ];
    // dispatch(setSearchResults(results));
    const payload = {
        searchCriteria
    }
    doPost("/employees",payload)
    .then(results => {
        console.log("got results:",results);
        const data = results.data.data;
        // console.log("Results: " + JSON.stringify(data));
        const uniqueData = data.map((row,index) => (
            {...row,id: index}
        ));
        // console.log("Unique Results: " + JSON.stringify(uniqueData));

        dispatch(setSearchResults(uniqueData));
    });
}

export const deleteEmployee = uid => {
    const promise = new Promise((resolve,reject)=>{
      doDelete("/employee/"+uid)
      .then(response => {
        if(response.data.status === SUCCESS){
            console.log("Successfully deleted.");
            resolve(SUCCESS);
        }
      })
      .catch(error => {
          console.log("Error while deleting...");
          reject(error);
      })
    });
    return promise;
}

export const updateEmployee = payload => {
    const promise = new Promise((resolve,reject)=>{
      doPut("/employee", payload)
      .then(response => {
        if(response.data.status === SUCCESS){
            console.log("Successfully updated.");
            resolve(SUCCESS);
        }
      })
      .catch(error => {
          console.log("Error while updating...");
          reject(error);
      })
    });
    return promise;
}