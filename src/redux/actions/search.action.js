import { post } from "../../service";

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

    post("/employees",{searchCriteria: "u7"})
    .then(results => {
        const data = results.data.data;
        console.log("Results: " + JSON.stringify(data));
        const uniqueData = data.map((row,index) => (
            {...row,id: index}
        ));
        console.log("Unique Results: " + JSON.stringify(uniqueData));

        dispatch(setSearchResults(uniqueData));
    });
}