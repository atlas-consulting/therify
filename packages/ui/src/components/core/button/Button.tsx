import Button, { ButtonProps } from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core';
import React from 'react';

export const ButtonFill: React.FC = (props: ButtonProps) => {
    const theme = useTheme();
    return (
        <Button color="primary" {...props} variant="contained" style={{ padding: theme.spacing(1) }}>
            {props.children}
        </Button>
    );
};
export const ButtonOutline: React.FC = (props: ButtonProps) => {
    const theme = useTheme();
    return (
        <Button color="primary" {...props} variant="outlined" style={{ padding: theme.spacing(1) }}>
            {props.children}
        </Button>
    );
};
