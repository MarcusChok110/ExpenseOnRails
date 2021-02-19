import Container from '@material-ui/core/Container';
import 'fontsource-roboto';
import Head from 'next/head';
import React from 'react';
import Header from './Header/index';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Expense On Rails</title>
      </Head>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
