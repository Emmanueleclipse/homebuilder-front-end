
import * as React from 'react';
import { Icon } from '@mui/material';
import Box from '@mui/material/Box';
import "./arrow.style.css"
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";


const  ArrowMenu=()=> {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const history = useHistory();
  const handleLogout = () => {
  dispatch(logout());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
          <MenuItem style={{width:50}}
          onClick={handleCloseUserMenu}>
          <div
             style={{display:"flex",flexDirection:"row"}}
           className="header-drop-down-item"
           onClick={handleLogout}
           >
           <div
           className="header-drop-down-item-icon"
           >
           <span class="material-icons">logout</span>
           </div>
           <div className="header-drop-down-item-label">Logout</div>
           </div>
           </MenuItem>
           <MenuItem>
           <div
            className="header-drop-down-item"
            onClick={() => history.push("/setting")}
           >
        <div className="header-drop-down-item-icon">
          <span class="material-icons">settings</span>
        </div>
        <div className="header-drop-down-item-label">Setting</div>
        </div>
        </MenuItem>
        </Menu>
        </Box>
      </Toolbar>
    </Container>
 

  )
}

export default ArrowMenu