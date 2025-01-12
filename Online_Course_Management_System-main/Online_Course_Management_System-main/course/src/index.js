import React from 'react';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider} from 'react-redux';
import store from './redux/store';
import * as ReactDOM from 'react-dom/client';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <ChakraProvider>
    <App />
  </ChakraProvider>
  </ReduxProvider>  
);
