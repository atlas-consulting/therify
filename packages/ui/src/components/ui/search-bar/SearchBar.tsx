import { Box, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { Input } from '../../core';
import { Search, Close } from '@material-ui/icons';
export type SearchBarProps = {
    value: string;
    label: string;
    placeholder?: string;
    'data-testid'?: string;
    onChange: (searchValue: string) => void;
    onClear?: () => void;
};
export const SearchBar = ({ label, value, onChange, onClear, placeholder }: SearchBarProps) => {
    const theme = useTheme();
    const handleChange = (ev: any) => onChange(ev.target?.value ?? '');
    const [isActive, setIsActive] = useState(false);
    const isVisible = !!value || isActive;
    return (
        <Box position="relative" display="inline-block" data-testid="searchbar">
            <label htmlFor={label} style={{ display: 'none' }}>
                {label}
            </label>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: '200ms',
                    opacity: Number(isVisible),
                }}
            >
                {onClear && (
                    <Box
                        data-testid="searchbar-clear"
                        onClick={onClear}
                        style={{
                            ...centeredIconStyle,
                            paddingRight: theme.spacing(1),
                            transition: '200ms',
                            opacity: Number(!!value),
                        }}
                    >
                        <Close style={centeredIconStyle} />
                    </Box>
                )}
                <Input
                    label={label}
                    name={label}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    style={{ paddingRight: theme.spacing(4.2) }}
                />
            </div>
            <Box style={{ ...searchIconStyle, paddingRight: theme.spacing(1) }}>
                <Search />
            </Box>
        </Box>
    );
};
const centeredIconStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const searchIconStyle: React.CSSProperties = {
    ...centeredIconStyle,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    pointerEvents: 'none',
};
