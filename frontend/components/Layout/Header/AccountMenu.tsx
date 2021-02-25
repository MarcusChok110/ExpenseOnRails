import { Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import Link from 'next/link';
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

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/';
    handleClose();
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
            <Link passHref href="/profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <Link passHref href="/login">
              <MenuItem component="a" onClick={handleClose}>
                Login
              </MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default AccountMenu;
