import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import React from 'react';
import { drawerWidth } from '.';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const SideNav: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.toolbar}></div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SideNav;
