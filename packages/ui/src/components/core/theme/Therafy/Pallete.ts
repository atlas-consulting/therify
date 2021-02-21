import { darken } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

export enum TherafyBrandColors {
    Orange = '#E3AD72',
    Purple = '#6279B8',
    Black = '#363636',
    DarkGray = '#303030',
    White = '#FFFFFF',
    Offwhite = '#F5F5F5',
    Success = '#3DDC97',
    SuccessLight = '#ECFBF5',
    WarningLight = '#F9EEE1',
    Error = '#DB3A34',
    ErrorLight = '#FBEBEB',
}

export const therafyPalette: PaletteOptions = {
    primary: {
        main: TherafyBrandColors.Orange,
        dark: darken(TherafyBrandColors.Orange, 0.05),
        contrastText: TherafyBrandColors.White,
    },
    secondary: {
        main: TherafyBrandColors.Purple,
        contrastText: TherafyBrandColors.White,
    },
    text: {
        primary: TherafyBrandColors.Black,
    },
    success: {
        light: TherafyBrandColors.SuccessLight,
        main: TherafyBrandColors.Success,
        contrastText: TherafyBrandColors.White,
    },
    warning: {
        light: TherafyBrandColors.WarningLight,
        main: TherafyBrandColors.Orange,
    },
    error: {
        light: TherafyBrandColors.ErrorLight,
        main: TherafyBrandColors.Error,
    },
    background: {
        default: TherafyBrandColors.Offwhite,
        paper: TherafyBrandColors.White,
    },
};
