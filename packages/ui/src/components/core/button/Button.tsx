import Button, { ButtonProps } from '@material-ui/core/Button';
import { useTheme, withStyles } from '@material-ui/core';
import React from 'react';

export const ButtonFill = (props: ButtonProps) => {
    const theme = useTheme();
    return (
        <Button
            color="primary"
            {...props}
            variant="contained"
            style={{ padding: theme.spacing(0, 1), textTransform: 'none' }}
        >
            {props.children}
        </Button>
    );
};
export const ButtonOutline = (props: ButtonProps) => {
    const theme = useTheme();
    return (
        <Button
            color="primary"
            {...props}
            variant="outlined"
            style={{ padding: theme.spacing(0, 1), textTransform: 'none' }}
        >
            {props.children}
        </Button>
    );
};

export const SuccessButton = (props: ButtonProps) => {
    const theme = useTheme();
    const SuccessButtonUi = withStyles({
        root: {
            textTransform: 'none',
            color: theme.palette.success.contrastText,
            backgroundColor: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            padding: theme.spacing(0, 1),
            '&:hover': {
                backgroundColor: theme.palette.success.dark,
                borderColor: theme.palette.success.dark,
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: theme.palette.success.light,
                borderColor: theme.palette.success.light,
            },
        },
    })(Button);
    return (
        <SuccessButtonUi {...props} variant="contained">
            {props.children}
        </SuccessButtonUi>
    );
};
