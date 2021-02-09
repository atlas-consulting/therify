import React from "react";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import {therafyTheme} from '../src/components/core/theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={therafyTheme}>
      <CssBaseline />
      <Story/>
    </ThemeProvider>
  )
];