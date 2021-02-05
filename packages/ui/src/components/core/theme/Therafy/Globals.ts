import { Overrides } from '@material-ui/core/styles/overrides';
import { TherafyBrandColors } from './Pallete';

export const therafyglobals: Overrides = {
    MuiCssBaseline: {
        '@global': {
            html: {
                WebkitFontSmoothing: 'auto',
            },
            body: {
                color: TherafyBrandColors.Black,
            },
        },
    },
};
