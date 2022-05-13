export const ROLE_EMPLOYEE = "EMPLOYEE";
export const ROLE_ADMIN = "ADMIN";
export const EMPLOYEE_MENU = [
    {
        name: "Search Employees",
        path: "/search"
    },
    {
        name: "Update Name Pronounce",
        path: "/pronounce"
    } ];
export const ADMIN_MENU = [
    {
        name: "Search Employees",
        path: "/search"
    },
    {
        name: "Update Name Pronounce",
        path: "/pronounce"
    },
    {
        name: "Add/Update Employees",
        path: "/manageEmployees"
    }
];

export const SEARCH_RESULTS_COLUMNS = [
    {
        field: "uid",
        headerName: "User ID"
    },
    {
        field: "empId",
        headerName: "Emp ID"
    },
    {
        field: "firstName",
        headerName: "First Name"
    },
    {
        field: "middleName",
        headerName: "Middle Name"
    },
    {
        field: "lastName",
        headerName: "Last Name"
    },
    {
        field: "preferredName",
        headerName: "Preffered Name"
    },
    {
        field: "emailId",
        headerName: "Email ID"
    }
 ];