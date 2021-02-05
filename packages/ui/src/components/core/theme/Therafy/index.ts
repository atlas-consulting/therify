import { createMuiTheme } from '@material-ui/core';
import { therafyglobals } from './Globals';
import { therafyPalette } from './Pallete';
import { therafyTypography } from './Typography';

export const therafyTheme = createMuiTheme({
    palette: therafyPalette,
    typography: therafyTypography,
    overrides: therafyglobals,
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
});
