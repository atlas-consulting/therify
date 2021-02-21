import { Box, Theme, useTheme } from '@material-ui/core';
import React from 'react';
import { Text, TextSmall, TextBold } from '../../core';
import { ApprovalButton } from '../approval-button';
export enum RankingStatus {
    GOOD = 'good',
    WARNING = 'warning',
    INCOMPATIBLE = 'incompatible',
}
export type ProviderRankingProps = {
    id: string;
    status: RankingStatus;
    rank: number;
    providerName: string;
    statusText?: string;
    onApprove: (rankingId: string) => Promise<unknown>;
    onCancel?: () => void;
};
const getStatusColor = ({ theme, status }: { status: RankingStatus; theme: Theme }) => {
    switch (status) {
        case RankingStatus.WARNING:
            return { backgroundColor: theme.palette.warning.light, textColor: theme.palette.warning.main };
        case RankingStatus.INCOMPATIBLE:
            return { backgroundColor: theme.palette.error.light, textColor: theme.palette.error.main };
        default:
            return { backgroundColor: theme.palette.success.light, textColor: theme.palette.success.main };
    }
};
export const ProviderRanking = ({
    id,
    status,
    rank,
    providerName,
    statusText,
    onApprove,
    onCancel,
}: ProviderRankingProps) => {
    const theme = useTheme();
    const { backgroundColor, textColor } = getStatusColor({ theme, status });
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            style={{ marginBottom: theme.spacing(1) }}
        >
            <Box
                style={{
                    ...flexCenter,
                    flexGrow: 1,
                    marginRight: theme.spacing(1),
                    justifyContent: 'space-between',
                    padding: theme.spacing(0.5, 2),
                    background: backgroundColor,
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <div style={flexCenter}>
                    <TextSmall style={{ width: theme.spacing(3), margin: 0 }}>{rank}.</TextSmall>
                    <TextBold style={{ margin: 0 }}>{providerName}</TextBold>
                </div>
                {statusText && <Text style={{ margin: 0, color: textColor }}>{statusText}</Text>}
            </Box>
            <Box>
                <ApprovalButton
                    isHidden={status === RankingStatus.INCOMPATIBLE}
                    rankingId={id}
                    onCancel={onCancel}
                    onApprove={onApprove}
                    buttonText="Approve"
                />
            </Box>
        </Box>
    );
};

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
