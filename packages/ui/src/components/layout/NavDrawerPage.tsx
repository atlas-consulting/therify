import React, { CSSProperties } from 'react';
import { Paper, Grid, useTheme, Hidden } from '@material-ui/core';

export type NavDrawerPageProps = {
    drawer: React.FC;
    children: React.ReactNode;
};

export const NavDrawerPage = ({ drawer: Drawer, children }: NavDrawerPageProps) => {
    const theme = useTheme();
    const navStyle: CSSProperties = {
        background: theme.palette.background.paper,
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden',
    };
    const contentStyle: CSSProperties = {
        background: theme.palette.background.default,
        padding: theme.spacing(3, 6),
        height: '100vh',
        overflow: 'auto',
        overflowX: 'hidden',
    };
    return (
        <Grid container>
            <Grid item xs={12} sm={2} style={navStyle}>
                {<Drawer />}
            </Grid>
            <Grid item xs={12} sm={10} style={contentStyle}>
                {children}
            </Grid>
        </Grid>
    );
};
