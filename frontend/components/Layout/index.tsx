import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import 'fontsource-roboto';
import Head from 'next/head';
import React from 'react';
import Header from './Header/index';
import SideNav from './SideNav';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>Expense On Rails</title>
      </Head>
      <Header />
      <SideNav />
      <Container>
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          {children}
        </main>
      </Container>
    </div>
  );
};

export default Layout;
