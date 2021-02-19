import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import {
  Dashboard,
  Home,
  Lock,
  MonetizationOn,
  Person,
} from '@material-ui/icons';
import React from 'react';
import { drawerWidth } from '.';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

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

/**
 * Interface for links in the List
 */
interface NavItem {
  text: string;
  icon: JSX.Element;
  href: string;
}

/**
 * Before the divider
 */
const navItemsBefore: NavItem[] = [
  { text: 'Home', icon: <Home />, href: '/' },
  { text: 'Account', icon: <Person />, href: '/account' },
  { text: 'Transactions', icon: <MonetizationOn />, href: '/transactions' },
  { text: 'Dashboard', icon: <Dashboard />, href: '/dashboard' },
];

/**
 * After the divider
 */
const navItemsAfter: NavItem[] = [
  { text: 'Register', icon: <Lock />, href: '/register' },
];

const SideNav: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const processNavItems = (items: NavItem[]) => {
    return items.map((item) => (
      <Link href={item.href} passHref key={item.text}>
        <ListItem button component="a" selected={router.pathname === item.href}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.text}</ListItemText>
        </ListItem>
      </Link>
    ));
  };

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
        <List>{processNavItems(navItemsBefore)}</List>
        <Divider />
        <List>{processNavItems(navItemsAfter)}</List>
      </Drawer>
    </>
  );
};

export default SideNav;
