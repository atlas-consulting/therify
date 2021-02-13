import React from 'react';
import { NavDrawerPage, Header1, SearchBar, SplitButton } from '@therify/ui';
import { useTheme } from '@material-ui/core';
import { Box } from '@material-ui/core';
const Nav = () => <h2>hi</h2>;
export const Matches = () => {
    const theme = useTheme();
    return (
        <NavDrawerPage drawer={Nav}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header1> Matches</Header1>
                <Box>
                    <span style={{ marginRight: theme.spacing(1) }}>
                        <SearchBar label="Search for matches" value={''} onChange={(val: string) => {}} />
                    </span>
                    <SplitButton options={[]} onClick={(option) => console.log(option?.text)} />
                </Box>
            </Box>
        </NavDrawerPage>
    );
};
