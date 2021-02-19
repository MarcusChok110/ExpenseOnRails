import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import AccountMenu from './AccountMenu';
import { drawerWidth } from '..';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Expense On Rails
        </Typography>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
