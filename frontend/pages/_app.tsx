import { AppProps } from 'next/app';
import store from '../redux/store';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import { CssBaseline } from '@material-ui/core';
import React from "react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
