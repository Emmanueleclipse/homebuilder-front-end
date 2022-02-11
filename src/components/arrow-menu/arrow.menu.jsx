
import * as React from 'react';
import { Icon } from '@mui/material';
import Box from '@mui/material/Box';
import "./arrow.style.css"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const  ArrowMenu=()=> {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
  dispatch(logout());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
console.log( anchorElUser)
  return (
   
    <Container className="arrow-container" maxWidth="xl">
      <Toolbar disableGutters>
     
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               < Icon className={anchorElUser!= null?`arrow-up`:"arrow"}>expand_more</Icon>
      
            </IconButton>

          </Tooltip>
         
          <Menu
        
        sx={{ mt: '48px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={anchorElUser}
        onClose={handleCloseUserMenu}
      >
      
          <MenuItem onClick={handleCloseUserMenu}>
          <div onClick={handleLogout}>
    <div className="side-bar-item-icon">
      <span class="material-icons">logout</span>
    </div>
    <div className="side-bar-item-label">Logout</div>
  </div>
          </MenuItem>
       
      </Menu>
         
         
        </Box>
      </Toolbar>
    </Container>
 

  )
}

export default ArrowMenu