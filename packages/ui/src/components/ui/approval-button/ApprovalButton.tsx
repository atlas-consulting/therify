import { Box, CircularProgress, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { SuccessButton, TextSmall, Text } from '../../core';

export type ApprovalButtonProps = {
    rankingId: string;
    onApprove: (rankingId: string) => Promise<unknown>;
    onCancel?: () => void;
    timeoutInMs?: number;
    buttonText?: string;
    isHidden?: boolean;
};
const Loader = ({
    timeoutInMs,
    onApprove,
    onCancel,
}: {
    timeoutInMs?: number;
    onApprove: () => Promise<unknown>;
    onCancel?: () => void;
}) => {
    const theme = useTheme();
    const [isCountingDown, setIsCountingDown] = useState(true);
    const [progress, setProgress] = useState(1);
    const timeout = timeoutInMs ?? 3000;
    const progressPerSecond = 100 / (timeout / 1000);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + progressPerSecond;
                if (prevProgress >= 100) {
                    setIsCountingDown(false);
                    clearInterval(intervalId);
                    onApprove();
                }
                return nextProgress;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [onApprove, progressPerSecond]);
    const undoApprove = () => {
        if (onCancel) {
            onCancel();
        }
    };
    return isCountingDown ? (
        <Box display="flex" alignContent="center" onClick={undoApprove}>
            <CircularProgress
                color="secondary"
                variant="determinate"
                value={progress}
                style={{ height: '16px', width: '16px' }}
            />
            <TextSmall style={{ margin: 0, marginLeft: theme.spacing(1) }}>Undo</TextSmall>
        </Box>
    ) : (
        <Box display="flex" alignContent="center">
            <CircularProgress color="primary" style={{ height: '16px', width: '16px' }} />
            <TextSmall style={{ margin: 0, marginLeft: theme.spacing(1) }}>Approving...</TextSmall>
        </Box>
    );
};
export const ApprovalButton = ({
    rankingId,
    onApprove,
    onCancel,
    timeoutInMs,
    buttonText = 'Approve',
    isHidden,
}: ApprovalButtonProps) => {
    const theme = useTheme();
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const startCountdown = () => {
        if (isHidden) return;
        setIsCountingDown(true);
    };
    const handleApprove = async () => {
        setIsCountingDown(true);
        await onApprove(rankingId);
        setIsCountingDown(false);
        setIsCompleted(true);
    };
    const handleCancel = () => {
        setIsCountingDown(false);
        if (onCancel) {
            onCancel();
        }
    };
    if (isCompleted) {
        return <Text style={{ color: theme.palette.success.main }}>Approved!</Text>;
    }
    return (
        <Box aria-disabled={isHidden} style={isHidden ? hiddenStyle : {}}>
            {isCountingDown ? (
                <Loader onApprove={handleApprove} onCancel={handleCancel} timeoutInMs={timeoutInMs} />
            ) : (
                <SuccessButton color="secondary" data-testid="approve-button" onClick={startCountdown}>
                    {buttonText}
                </SuccessButton>
            )}
        </Box>
    );
};

const hiddenStyle: React.CSSProperties = {
    opacity: 0,
    pointerEvents: 'none',
};
