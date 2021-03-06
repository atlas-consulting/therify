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
    Modal,
    Text,
    ButtonOutline,
    ButtonFill,
} from '@therify/ui';
import { useTheme, Box, CircularProgress } from '@material-ui/core';
import { useMatchesApi } from '../../hooks/useMatchesApi';
import { MatchesList } from '../../components/matches-list/MatchesList';
import { Patient } from '@therify/types/lib/match';
import { CreateMatchModal } from '../../components/create-match-modal';
import { MatchTypes } from '@therify/types';

const Nav = () => <h2>hi</h2>;
export const Matches = () => {
    const theme = useTheme();
    const {
        matches,
        getMatches,
        createMatch,
        approveMatch,
        denyMatch,
        isDenyingMatch,
        isLoadingMatches,
        isCreatingMatch,
        isLoadingProviders,
        listProviders,
        listProvidersError,
        providers,
    } = useMatchesApi();
    // const [selectedMatches, setSelectedMatches] = useState({});
    const [companyFilter, setCompanyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortByFilter, setSortByFilter] = useState('newest');
    const [createMatchTargetUser, setCreateMatchTargetUser] = useState<MatchTypes.Patient | null>(null);
    const [matchIdToDeny, setMatchIdToDeny] = useState<string | null>(null);
    const handleOpenCreateMatchModal = (user: Patient) => {
        setCreateMatchTargetUser(user);
        listProviders({
            state: user.preferences.state,
            network: user.preferences.network,
        });
    };
    const handleCreateMatch = () => {
        createMatch({ patientId: 'add', providerId: 'me' });
    };

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
        if (matches.length === 0) {
            getMatches();
        }
    }, []);
    return (
        <>
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
                <MatchesList
                    onCheck={() => {}}
                    handleApprove={approveMatch}
                    handleDeleteMatch={(id) => setMatchIdToDeny(id)}
                    handleCreateMatch={handleOpenCreateMatchModal}
                    isLoading={isLoadingMatches}
                />
            </NavDrawerPage>
            {createMatchTargetUser && (
                <CreateMatchModal
                    selectedUser={createMatchTargetUser}
                    isOpen={!!createMatchTargetUser}
                    isLoading={isCreatingMatch || isLoadingProviders}
                    errorMsg={listProvidersError}
                    providers={providers}
                    handleCreate={handleCreateMatch}
                    handleClose={() => setCreateMatchTargetUser(null)}
                ></CreateMatchModal>
            )}
            {matchIdToDeny && (
                <Modal
                    isOpen={!!matchIdToDeny}
                    title={isDenyingMatch ? '' : 'Deny match'}
                    handleClose={() => setMatchIdToDeny(null)}
                >
                    {isDenyingMatch ? (
                        <Box
                            display="flex"
                            padding={theme.spacing(0, 4)}
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Text>Denying...</Text>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <>
                            <Text>Are you sure you want to deny match {matchIdToDeny}?</Text>
                            <ButtonOutline onClick={() => setMatchIdToDeny(null)}>cancel</ButtonOutline>
                            <ButtonFill
                                onClick={() => {
                                    denyMatch(matchIdToDeny).then(() => setMatchIdToDeny(null));
                                }}
                                style={{ marginLeft: theme.spacing(1) }}
                            >
                                Deny
                            </ButtonFill>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};
