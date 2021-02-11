import React from 'react';
import { therafyTheme } from '@therify/ui';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';
import './App.css';
import { Router } from './routes';

function App() {
    return (
        <ThemeProvider theme={therafyTheme}>
            <StoreProvider store={store}>
                <CssBaseline />
                <Router />
            </StoreProvider>
        </ThemeProvider>
    );
}

export default App;
