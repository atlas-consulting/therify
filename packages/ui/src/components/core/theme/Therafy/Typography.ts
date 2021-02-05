import { TypographyOptions } from '@material-ui/core/styles/createTypography';

export enum TherafyFontSizes {
    Xxl = '4Rem',
    Xl = '2.5rem',
    Lg = '2rem',
    Md = '1.5rem',
    Base = '1rem',
    Sm = '.875rem',
}

// Poppins is Sofia Pro alternate
export const therafyTypography: TypographyOptions = {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
        fontSize: TherafyFontSizes.Xl,
        fontWeight: 700,
    },
    h2: {
        fontSize: TherafyFontSizes.Lg,
        fontWeight: 700,
    },
    h3: {
        fontSize: TherafyFontSizes.Md,
        fontWeight: 700,
    },
    body1: {
        fontSize: TherafyFontSizes.Base,
        fontWeight: 400,
    },
    body2: {
        fontSize: TherafyFontSizes.Sm,
        fontWeight: 300,
    },
};
