import * as React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
// import { SEARCH_RESULTS_COLUMNS } from '../common/constants';
import { getSearchResults } from '../redux/actions/search.action';
import CampaignIcon from '@mui/icons-material/Campaign';
import { baseURL } from '../service';

export default function EmpSearch() {
  const [searchCriteria, setSearchCriteria] = React.useState("");
  const [selectedUID, setSelectedUID] = React.useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.search.searchResults);
  const SEARCH_RESULTS_COLUMNS = [
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
        flex: 4,
        renderCell: data => {
            console.log("render cell: ", data);
            const uid = data.row.uid;
            const getAudio = (uid) =>{
              setSelectedUID(uid);
              console.log("selected UID=", uid);
            }
            const pronunciationURL = (uid) => {
              return baseURL+"/getNamePronunciation/"+uid;
            };
            return(
              <React.Fragment>
                <Button key={uid} onClick={()=>getAudio(uid)} startIcon={<CampaignIcon />} />
                {selectedUID===uid &&
                  <audio key={uid} controls autoPlay playsInline>
                    <source src={pronunciationURL(uid)} type="audio/mp3" />
                  </audio>
                }
              </React.Fragment>
            );
        }
    }
 ];
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
            />
            <Button onClick={()=>dispatch(getSearchResults(searchCriteria))}>Search</Button>
        </div>
        <div style={{paddingTop: "1rem"}}>
        <DataGrid
            autoHeight
            rows={searchResults}
            columns={SEARCH_RESULTS_COLUMNS}
            pageSize={10}
            rowsPerPageOptions={[5]}
            // checkboxSelection
        />
        </div>
    </div>
  );
}
