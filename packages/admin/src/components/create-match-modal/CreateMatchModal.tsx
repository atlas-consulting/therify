import React, { useState } from 'react';
import { MatchTypes } from '@therify/types';
import { ButtonFill, ButtonOutline, Modal, Text, TextBold, ProviderRanking, PreferencesGrid } from '@therify/ui';
import { useTheme, Box, CircularProgress, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RankingStatus } from '@therify/types/lib/match';

export type CreateMatchModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    handleCreate: ({ provider, user }: { provider: MatchTypes.Provider; user: MatchTypes.Patient }) => void;
    providers: MatchTypes.Provider[];
    selectedUser: MatchTypes.Patient;
    isLoading: boolean;
    errorMsg?: string;
};
export const CreateMatchModal = ({
    isOpen,
    handleClose,
    handleCreate,
    providers,
    isLoading,
    errorMsg,
    selectedUser,
}: CreateMatchModalProps) => {
    const theme = useTheme();
    const [selectedProvider, setSelectedProvider] = useState<MatchTypes.Provider | null>(null);
    const createMatch = () => {
        if (selectedProvider) {
            handleCreate({ provider: selectedProvider, user: selectedUser });
        }
    };
    const Error = errorMsg ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <Text>{errorMsg}</Text>
        </Box>
    ) : null;
    const Loading = isLoading ? (
        <Box display="flex" padding={theme.spacing(1)} justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
        </Box>
    ) : null;
    return (
        <Modal isOpen={isOpen} handleClose={handleClose} title="Create Match">
            {Error ?? Loading ?? (
                <Box width="400px">
                    <Text style={{ fontWeight: 300, marginTop: theme.spacing(2) }}>{selectedUser.email}</Text>
                    <Box width="100%" style={{ marginBottom: theme.spacing(2) }}>
                        <PreferencesGrid preferences={selectedUser.preferences} />
                    </Box>
                    <TextBold style={{ marginBottom: theme.spacing(1) }}>Provider</TextBold>
                    <Box width="100%" style={{ marginBottom: theme.spacing(2) }}>
                        {selectedProvider && (
                            <Box style={{ marginBottom: theme.spacing(2) }}>
                                <ProviderRanking
                                    id="selectedProviderStatus"
                                    displayText="good"
                                    status={RankingStatus.GOOD}
                                />
                            </Box>
                        )}
                        <Autocomplete
                            id="combo-box-demo"
                            options={providers}
                            getOptionLabel={(provider) => provider.name}
                            renderInput={(params) => (
                                <TextField {...params} label="Select a provider" variant="outlined" />
                            )}
                            onChange={(_, value) => setSelectedProvider(value)}
                        />
                    </Box>
                    <Box>
                        <ButtonOutline onClick={handleClose}>Cancel</ButtonOutline>
                        <ButtonFill
                            onClick={createMatch}
                            disabled={!selectedProvider}
                            style={{ marginLeft: theme.spacing(1) }}
                        >
                            Create
                        </ButtonFill>
                    </Box>
                </Box>
            )}
        </Modal>
    );
};
