import React, { useState } from "react";
import AppBarMenu from "./AppBarMenu.jsx";
import Sidebar from "./Sidebar.jsx";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
import SignIn from "../Login/SignIn.jsx";
import MainContainer from "./MainContainer.jsx";
import { Feedback } from "./Feedback.jsx";

const App = props => {
  const loggedIn = useSelector(state => state.userEntitlement.loggedIn);
    return(
    <>
      {!loggedIn && <SignIn />}
      {loggedIn &&
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarMenu />
          <Sidebar />
          <MainContainer />
          <Feedback />
        </Box>
      }
    </>);
}

export default App;