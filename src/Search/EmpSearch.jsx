import * as React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { SEARCH_RESULTS_COLUMNS } from '../common/constants';
import { getSearchResults } from '../redux/actions/search.action';

export default function EmpSearch() {
  const [searchCriteria, setSearchCriteria] = React.useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(state => state.search.searchResults);
  return (
    <div>
        <h1>Employee Search</h1>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField 
                id="outlined-basic" 
                label="Search" 
                variant="outlined" 
                name='searchCriteria' 
                onChange={(value)=>setSearchCriteria(value)}
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
