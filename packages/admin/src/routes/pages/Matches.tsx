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
import { MatchTypes } from '@therify/types';
import { useTheme, Box, CircularProgress } from '@material-ui/core';
import { useMatchesApi } from '../../hooks/useMatchesApi';
import { MatchesList, CreateMatchModal, Navigation } from '../../components';

export const Matches = () => {
    const theme = useTheme();
    const {
        getMatches,
        approveMatchesForUser,
        denyMatch,
        isDenyingMatch,
        denyMatchError,
        isLoadingMatches,
        createRanking,
        isCreatingRanking,
        createRankingError,
        isLoadingProviders,
        listProviders,
        listProvidersError,
        providers,
    } = useMatchesApi();
    // const [selectedMatches, setSelectedMatches] = useState({});
    const [companyFilter, setCompanyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortByFilter, setSortByFilter] = useState('newest');
    const [createMatchTarget, setCreateMatchTarget] = useState<MatchTypes.Match | null>(null);
    const [matchIdToDeny, setMatchIdToDeny] = useState<string | null>(null);
    const handleOpenCreateMatchModal = (match: MatchTypes.Match) => {
        setCreateMatchTarget(match);
        listProviders({
            state: match.user.stateOfResidence,
            network: match.user.insuranceProvider,
        });
    };
    const handleCreateRanking = async (providerId: string) => {
        if (!createMatchTarget) return;
        await createRanking({
            userId: createMatchTarget.user.id,
            providerId,
        });
        setCreateMatchTarget(null);
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
        getMatches();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <NavDrawerPage drawer={Navigation} style={{ flexFlow: 'column', display: 'flex', height: '100vh' }}>
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

                    <Box
                        onClick={getMatches}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop={3}
                    >
                        <MatchCounter good={[]} warnings={[]} incompatibilities={[]} />
                        <SelectGroup configs={selectConfigs} />
                    </Box>
                    <Divider margin={`${theme.spacing(2)}px 0 0`} />
                </Box>
                <MatchesList
                    onCheck={() => {}}
                    handleApprove={approveMatchesForUser}
                    handleDeleteMatch={(id) => setMatchIdToDeny(id)}
                    handleCreateMatch={handleOpenCreateMatchModal}
                    isLoading={isLoadingMatches}
                />
            </NavDrawerPage>
            {createMatchTarget && (
                <CreateMatchModal
                    selectedUser={createMatchTarget.user}
                    isOpen={!!createMatchTarget}
                    isLoading={isCreatingRanking || isLoadingProviders}
                    createError={createRankingError}
                    getProvidersError={listProvidersError}
                    providers={providers}
                    handleCreate={handleCreateRanking}
                    handleClose={() => setCreateMatchTarget(null)}
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
                            {denyMatchError ? (
                                <Text color="error">There was a problem: {denyMatchError}</Text>
                            ) : (
                                <Text>Are you sure you want to deny match {matchIdToDeny}?</Text>
                            )}
                            <ButtonOutline onClick={() => setMatchIdToDeny(null)}>cancel</ButtonOutline>
                            <ButtonFill
                                onClick={() => {
                                    denyMatch(matchIdToDeny).then(() => setMatchIdToDeny(null));
                                }}
                                style={{ marginLeft: theme.spacing(1) }}
                            >
                                {denyMatchError ? 'Try again' : 'Deny'}
                            </ButtonFill>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};
