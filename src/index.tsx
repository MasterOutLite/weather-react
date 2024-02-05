import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";

import {PersistGate} from "redux-persist/integration/react";

const theme = createTheme({
  typography: {
    fontFamily: "'Jost', sans-serif",
    body2: {
      fontSize: 13
    },
    body1: {
      fontWeight: 500,
      fontSize: 12,
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
    },
    h5: {
      fontSize: 18
    },
    h4: {
      fontSize: 44
    },
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
