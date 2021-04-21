import React, { useState } from 'react';
import { MatchTypes } from '@therify/types';
import { ButtonFill, ButtonOutline, Modal, Text, TextBold, ProviderRanking, PreferencesGrid } from '@therify/ui';
import { useTheme, Box, CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RankingStatus } from '@therify/types/lib/match';

export type CreateMatchModalProps = {
    selectedUser: MatchTypes.User;
    isOpen: boolean;
    handleClose: () => void;
    handleCreate: (providerId: string) => void;
    providers: MatchTypes.Provider[];
    isLoading: boolean;
    getProvidersError?: string;
    createError?: string;
};
export const CreateMatchModal = ({
    selectedUser,
    isOpen,
    handleClose,
    handleCreate,
    providers,
    isLoading,
    getProvidersError,
    createError,
}: CreateMatchModalProps) => {
    const theme = useTheme();
    const [selectedProvider, setSelectedProvider] = useState<MatchTypes.Provider | null>(null);
    const {
        emailAddress,
        stateOfResidence,
        genderPreference,
        racePreference,
        issues,
        insuranceProvider,
    } = selectedUser;
    const createMatch = () => {
        if (selectedProvider) {
            handleCreate(selectedProvider.id);
        }
    };
    const CreateButton = ({ children }: { children: React.ReactChild }) => (
        <ButtonFill
            data-testid="create-btn"
            onClick={createMatch}
            disabled={!selectedProvider}
            style={{ marginLeft: theme.spacing(1) }}
        >
            {children}
        </ButtonFill>
    );
    const GetProvidersError = getProvidersError ? (
        <Box padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <Text>There seems to be a problem: {getProvidersError}</Text>
            <Text>please close and try again</Text>
            <ButtonFill onClick={handleClose}>Close</ButtonFill>
        </Box>
    ) : null;
    const CreateError = createError ? (
        <Box padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <Text>There seems to be a problem: {createError}</Text>
            <CreateButton>Retry</CreateButton>
        </Box>
    ) : null;
    const Loading = isLoading ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : null;
    return (
        <Modal isOpen={isOpen} handleClose={handleClose} title="Create Match">
            {GetProvidersError ?? CreateError ?? Loading ?? (
                <Box width="400px">
                    <Text style={{ fontWeight: 300, marginTop: theme.spacing(2) }}>{emailAddress}</Text>
                    <Box width="100%" style={{ marginBottom: theme.spacing(2) }}>
                        <PreferencesGrid
                            stateOfResidence={stateOfResidence}
                            genderPreference={genderPreference}
                            racePreference={racePreference}
                            issues={issues}
                            insuranceProvider={insuranceProvider}
                        />
                    </Box>
                    <TextBold style={{ marginBottom: theme.spacing(1) }}>Provider</TextBold>
                    <Box width="100%" style={{ marginBottom: theme.spacing(2) }}>
                        {selectedProvider && (
                            <Box style={{ marginBottom: theme.spacing(2) }}>
                                <ProviderRanking
                                    data-testid="provider-ranking"
                                    id="selectedProviderStatus"
                                    displayText="good"
                                    status={RankingStatus.GOOD}
                                />
                            </Box>
                        )}
                        <Autocomplete
                            data-testid="provider-select"
                            id="combo-box-demo"
                            options={providers}
                            getOptionLabel={(provider) => `${provider.firstName} ${provider.lastName}`}
                            renderInput={(params) => (
                                <TextField {...params} label="Select a provider" variant="outlined" />
                            )}
                            onChange={(_, value) => setSelectedProvider(value)}
                        />
                    </Box>
                    <Box>
                        <ButtonOutline data-testid="cancel-btn" onClick={handleClose}>
                            Cancel
                        </ButtonOutline>
                        <CreateButton>Create</CreateButton>
                    </Box>
                </Box>
            )}
        </Modal>
    );
};
