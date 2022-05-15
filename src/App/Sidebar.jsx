import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom';
// import { Redirect} from 'react-router-dom';
import EmpSearch from '../Search/EmpSearch.jsx';
import { useSelector } from 'react-redux';
import { ROLE_ADMIN, EMPLOYEE_MENU, ADMIN_MENU } from '../common/constants.js';
const drawerWidth = 240;

export default function Sidebar() {
  const role = useSelector(state => state.userEntitlement.user.entitlement);
  let sideMenuList = [];
  console.log("User role=", role);
  if(role === ROLE_ADMIN){
    sideMenuList = ADMIN_MENU;
  }else{
    sideMenuList = EMPLOYEE_MENU;
  }
  console.log("menus=", sideMenuList);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (

      <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sideMenuList.map((menu, index) => (
            <>
              <ListItem key={index} disablePadding onClick={()=> <Navigate to={menu.path} />}>
                <ListItemButton selected={index===selectedIndex} onClick={()=>setSelectedIndex(index)}>
                  <ListItemText >
                   <NavLink to={menu.path} style={{textDecoration: "none"}}>{menu.name}</NavLink>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <Divider />
            </>
            ))}
          </List>
        </Box>
      </Drawer>

      </>
  );
}
