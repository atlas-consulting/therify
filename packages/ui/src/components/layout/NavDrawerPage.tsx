import React, { CSSProperties } from 'react';
import { Grid, useTheme } from '@material-ui/core';

export type NavDrawerPageProps = {
    drawer: React.FC;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const NavDrawerPage = ({ drawer: Drawer, children, style }: NavDrawerPageProps) => {
    const theme = useTheme();
    const navStyle: CSSProperties = {
        background: theme.palette.background.paper,
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden',
    };
    const contentStyle: CSSProperties = {
        background: theme.palette.background.default,
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden',
    };
    return (
        <Grid container>
            <Grid item xs={12} sm={2} style={navStyle}>
                {<Drawer />}
            </Grid>
            <Grid item xs={12} sm={10} style={{ ...contentStyle, ...style }}>
                {children}
            </Grid>
        </Grid>
    );
};
