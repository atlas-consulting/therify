import { Box, Theme, useTheme, withStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { RankingStatus } from '@therify/types/lib/match';
import React from 'react';
import { Text, TextSmall, TextBold } from '../../core';
import { ApprovalButton } from '../approval-button';
export type ProviderRankingProps = {
    id: string;
    status: RankingStatus;
    rank: number;
    providerName: string;
    statusText?: string;
    onApprove: (rankingId: string) => Promise<unknown>;
    onCancel?: () => void;
    onDelete?: (rankingId: string) => void;
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
    onDelete,
}: ProviderRankingProps) => {
    const theme = useTheme();
    const { backgroundColor, textColor } = getStatusColor({ theme, status });
    return (
        <RankingWrapper style={{ marginBottom: theme.spacing(1) }}>
            {onDelete && (
                <DeleteWithStyles title="Delete this match" className="delete-match" onClick={() => onDelete(id)}>
                    <Delete color="error" fontSize="small" style={{ marginRight: theme.spacing(1) }} />
                </DeleteWithStyles>
            )}
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
        </RankingWrapper>
    );
};

const flexCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const DeleteWithStyles = withStyles({
    root: {
        opacity: 0,
        cursor: 'pointer',
        transition: '200ms',
        '&:hover': {
            opacity: '1 !important',
        },
    },
})(Box);

const RankingWrapper = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        '&:hover .delete-match': {
            opacity: 0.5,
        },
    },
})(Box);
