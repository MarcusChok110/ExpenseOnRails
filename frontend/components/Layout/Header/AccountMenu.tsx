import { Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/user';

/**
 * Profile icon on top right with options to login / logout and view profile
 */
const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        id="account-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {user.loggedIn ? (
          <div>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default AccountMenu;
