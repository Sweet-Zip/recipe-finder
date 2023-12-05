'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { IoIosSearch } from "react-icons/io";
import { useRouter } from 'next/navigation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    border: '0.5px solid #9e9e9e'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function SearchAppBar() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/recipe?search=${searchTerm}`)
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    return (
        <Toolbar>
            <form onSubmit={handleSearch}>
                <Search>
                    <SearchIconWrapper>
                        <IoIosSearch />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </form>
        </Toolbar>
    )
}
