import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import 'fontsource-roboto';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { accountActions } from '../../redux/slices/account';
import { transactionsActions } from '../../redux/slices/transactions';
import { selectUser, userActions } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';
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
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  // fetch user on start
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    dispatch(userActions.fetchUserByJWT(jwt));
  }, []);

  // fetch account and transactions on user change
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!user.loggedIn || !jwt) return;

    dispatch(accountActions.fetchAccountById({ jwt, _id: user.account }));
    dispatch(transactionsActions.fetchTransactions({ jwt }));
  }, [user]);

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
