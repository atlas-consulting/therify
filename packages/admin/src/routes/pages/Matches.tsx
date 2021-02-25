import React, { useState, useEffect } from 'react';
import {
    NavDrawerPage,
    Header1,
    SearchBar,
    SplitButton,
    MatchCounter,
    SelectGroup,
    SelectConfig,
    Divider,
    PatientCard,
} from '@therify/ui';
import { MatchTypes } from '@therify/types';
import { useTheme, CircularProgress } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { mockModelResult } from '../../utils/mocks/ranking';

const Nav = () => <h2>hi</h2>;
export const Matches = () => {
    const theme = useTheme();
    const modelResults: MatchTypes.Match[] = [
        { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test1' } },
        { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test2' } },
        { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test3' } },
        { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test4' } },
        { ...mockModelResult, patient: { ...mockModelResult.patient, id: 'test5' } },
    ];
    const [isLoading, setIsLoading] = useState(false);
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
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    }, []);
    return (
        <NavDrawerPage
            drawer={Nav}
            style={{
                flexFlow: 'column',
                display: 'flex',
                height: '100vh',
            }}
        >
            <Box style={{ padding: theme.spacing(3, 6, 0, 6) }}>
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
                    <MatchCounter good={[]} warnings={[]} incompatibilities={[]} />
                    <SelectGroup configs={selectConfigs} />
                </Box>
                <Divider margin={`${theme.spacing(2)}px 0 0`} />
            </Box>

            <Box flexGrow={1} overflow="auto" style={{ padding: theme.spacing(3, 6), paddingBottom: 0 }}>
                {isLoading ? (
                    <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    modelResults.map(({ patient, matches }) => (
                        <PatientCard
                            key={patient.id}
                            isChecked={false}
                            onCheck={() => {}}
                            patient={patient}
                            rankings={matches}
                            handleApprove={async (result) => {
                                console.log(result);
                            }}
                            handleDeleteMatch={async (id: string) => {
                                console.log('deleting id: ' + id);
                            }}
                            handleCreateMatch={() => console.log('create match!')}
                        />
                    ))
                )}
            </Box>
        </NavDrawerPage>
    );
};
