import '../styles/global.css';
import { AppProps } from 'next/app';
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
