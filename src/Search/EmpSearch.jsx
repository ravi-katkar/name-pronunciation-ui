import * as React from 'react';
import { Button, Stack, Switch, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
// import { SEARCH_RESULTS_COLUMNS } from '../common/constants';
import { deleteEmployee, getSearchResults, updateEmployee } from '../redux/actions/search.action';
import CampaignIcon from '@mui/icons-material/Campaign';
import { baseURL } from '../service';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { CONFIRMATION, ROLE_ADMIN, ROLE_EMPLOYEE, SUCCESS } from '../common/constants';
import { openDialog, OPEN_DIALOG } from '../redux/actions/common.action';
import { PronounceDialog } from './PronounceDialog.jsx';

export default function EmpSearch() {
  const userEntitlement = useSelector(state => state.userEntitlement.user.entitlement);
  const [searchCriteria, setSearchCriteria] = React.useState("");
  const [selectedUID, setSelectedUID] = React.useState("");
  const [openPronounceDialog, setOpenPronounceDialog] = React.useState(false);
  const [phonetic, setPhonetic] = React.useState("");
  const [pronounceUrl, setPronounceUrl] = React.useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.search.searchResults);
  const tableColumns = [
    {
        field: "uid",
        headerName: "User ID"
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
    },
    {
        field: "pronounce",
        headerName: "Pronounce Name",
        flex: 2,
        renderCell: data => {
            // console.log("render cell: ", data);
            const uid = data.row.uid;
            const getAudio = (uid) =>{
              setSelectedUID(uid);
              setPhonetic(data.row.phonetic);
              setPronounceUrl(baseURL+"/getNamePronunciation/"+uid);
              setOpenPronounceDialog(true);
              console.log("selected UID=", uid);
            }
            const pronunciationURL = (uid) => {
              return baseURL+"/getNamePronunciation/"+uid;
            };
            return(
              <React.Fragment>
                <Button key={uid} onClick={()=>getAudio(uid)} startIcon={<CampaignIcon />} />
                {/* {selectedUID===uid &&
                  <audio key={uid} controls autoPlay playsInline>
                    <source src={pronunciationURL(uid)} type="audio/mp3" />
                  </audio>
                } */}
              </React.Fragment>
            );
        }
    }
 ];

 const adminColumns = [
  {
    field:"delete",
    headerName: "Delete",
    renderCell: ({row}) =>{
      const uid= row.uid;
      const deleteEmp = uid =>{
        deleteEmployee(uid)
        .then(response => {
          if(response === SUCCESS){
            dispatch(openDialog("Pronunciation record deleted successfully"), CONFIRMATION);
            dispatch(getSearchResults(searchCriteria));
          }
        })
      }
      return(
        <React.Fragment>
          <Button onClick={()=>deleteEmp(uid)} startIcon={<DeleteIcon />} />
        </React.Fragment>
      );
    }
  },
  {
    field: "adminRights",
    headerName: "Admin",
    renderCell: ({row}) => {
      const uid= row.uid;
      const updateAdminRights = flag => {
        updateEmployee({
            "uid": uid,
            "empId": row.empId,
            "firstName": row.firstName,
            "entitlement": flag? ROLE_ADMIN : ROLE_EMPLOYEE
        })
        .then(response => {
          if(response === SUCCESS){
            dispatch(openDialog("Admin rights updated successfully", CONFIRMATION));
            dispatch(getSearchResults(searchCriteria));
          }
        })
      }
      return(
        <React.Fragment>
          <Switch checked={row.entitlement === ROLE_ADMIN} onChange={({target})=>updateAdminRights(target.checked)} />
        </React.Fragment>
      );
    }
  }
 ];
 const getColumns = () => {
   if(userEntitlement === ROLE_ADMIN){
     return [...tableColumns, ...adminColumns];
   }else{
     return tableColumns;
   }
 }

  const handleClose = () => {
    setOpenPronounceDialog(false);
  }
  return (
    <div>
      <h1>Employee Search</h1>
      <div style={{display: 'flex', alignItems: 'center'}}>
          <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              name='searchCriteria'
              onChange={({target})=>setSearchCriteria(target.value)}
              sx={{width: "40%"}}
          />
          &nbsp;&nbsp;
          <Button
            style={{paddingLeft: "2rem"}}
            variant='contained'
            onClick={()=>dispatch(getSearchResults(searchCriteria))}
            endIcon={<SearchIcon />}>Search</Button>
      </div>
      <div style={{paddingTop: "1rem"}}>
      <DataGrid
          autoHeight
          rows={searchResults}
          columns={getColumns()}
          pageSize={10}
          rowsPerPageOptions={[5]}
          // checkboxSelection
      />
      </div>
      <PronounceDialog
        open={openPronounceDialog}
        phonetic={phonetic}
        url={pronounceUrl}
        handleClose={handleClose}
        uid={selectedUID}
      />
    </div>
  );
}
