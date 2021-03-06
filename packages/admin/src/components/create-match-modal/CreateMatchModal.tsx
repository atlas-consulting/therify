import React, { useState } from 'react';
import { MatchTypes } from '@therify/types';
import { ButtonFill, ButtonOutline, Modal, Text, TextBold, TextSmall } from '@therify/ui';
import { useTheme, Box, CircularProgress, TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
                    <Grid container style={{ marginBottom: theme.spacing(2) }}>
                        <Grid item xs={12} sm={4}>
                            <TextSmall style={{ flexGrow: 3 }}>
                                <b>State: </b>
                                {selectedUser.preferences.state}
                            </TextSmall>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextSmall style={{ flexGrow: 3 }}>
                                <b>Gender: </b>
                                {selectedUser.preferences.gender}
                            </TextSmall>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextSmall style={{ flexGrow: 3 }}>
                                <b>Specialty: </b>
                                {selectedUser.preferences.specialty}
                            </TextSmall>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextSmall style={{ flexGrow: 3 }}>
                                <b>Network: </b>
                                {selectedUser.preferences.network}
                            </TextSmall>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextSmall style={{ flexGrow: 3 }}>
                                <b>Race: </b>
                                {selectedUser.preferences.race}
                            </TextSmall>
                        </Grid>
                    </Grid>
                    <TextBold style={{ marginBottom: theme.spacing(1) }}>Provider</TextBold>
                    <Autocomplete
                        id="combo-box-demo"
                        options={providers}
                        getOptionLabel={(provider) => provider.name}
                        renderInput={(params) => <TextField {...params} label="Select a provider" variant="outlined" />}
                        onChange={(_, value) => setSelectedProvider(value)}
                    />
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
