import React from 'react';
import {
    NavDrawerPage,
    Header1,
    SearchBar,
    SplitButton,
    MatchCounter,
    SelectGroup,
    SelectConfig,
    Divider,
} from '@therify/ui';
import { MatchTypes } from '@therify/types';
import { useTheme } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useState } from 'react';
const Nav = () => <h2>hi</h2>;
export const Matches = () => {
    const theme = useTheme();
    const rankings: MatchTypes.Match[] = [];
    const [companyFilter, setCompanyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortByFilter, setSortByFilter] = useState('newest');

    const selectConfigs: SelectConfig[] = [
        {
            options: [
                { value: 'all', text: 'all' },
                { value: 'CriticalMass', text: 'Critical Mass' },
                { value: 'Thumbtack', text: 'Thumbtack' },
            ],
            id: 'company-select',
            name: 'Company',
            label: 'Company',
            selectedValue: companyFilter,
            onChange: (val: string) => setCompanyFilter(val),
        },
        {
            options: [
                { value: 'all', text: 'all' },
                { value: 'no-warnings', text: 'No Warnings' },
                { value: 'warning', text: 'Warnings' },
                { value: 'incompatible', text: 'Incompatible' },
            ],
            id: 'status-select',
            name: 'Status',
            label: 'Status',
            selectedValue: statusFilter,
            onChange: (val: string) => setStatusFilter(val),
        },
        {
            options: [
                { value: 'newest', text: 'Newest' },
                { value: 'alphabetical', text: 'Alphabetical' },
                { value: 'no-warnings-first', text: 'No Warnings First' },
                { value: 'warnings-first', text: 'Warnings First' },
                { value: 'incompatible-first', text: 'Incompatibles First' },
            ],
            id: 'sort-select',
            name: 'Sort by',
            label: 'Sort by',
            selectedValue: sortByFilter,
            onChange: (val: string) => setSortByFilter(val),
        },
    ];
    return (
        <NavDrawerPage drawer={Nav}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header1>Matches</Header1>
                <Box>
                    <SearchBar
                        label="Search for matches"
                        value={''}
                        onChange={(val: string) => {}}
                        style={{ marginRight: theme.spacing(1) }}
                    />
                    <SplitButton options={[]} onClick={(option) => console.log(option?.text)} />
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
                <MatchCounter matches={rankings} />
                <SelectGroup configs={selectConfigs} />
            </Box>

            <Divider />
        </NavDrawerPage>
    );
};
