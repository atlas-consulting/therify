import React from 'react';
import { therafyTheme } from '@therify/ui';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import './App.css';
import { Router } from './routes';

function App() {
    return (
        <ThemeProvider theme={therafyTheme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App;
