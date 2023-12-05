'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchAppBar from './SearchAppBar'
import { Menu, MenuItem } from '@mui/material'
import { IoIosMenu } from 'react-icons/io'
import CustomizedSwitches from './ToggleTheme'
import { LoadingComponent } from './LoadingComponent'
import './styles/navbar.css'
type NavItemsProps = {
    link: string
    label: string
}

export default function NavbarComponent() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);
    const [theme, setTheme] = useState('loading'); // Initially set a loading state

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
            setTheme('light'); // Set default theme if no preference is found
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const navItems: NavItemsProps[] = [
        {
            link: '/',
            label: 'Homepage'
        },
        {
            link: '/recipe',
            label: 'Recipe Page'
        },
        {
            link: '/contact',
            label: 'Contact US'
        },
        {
            link: '/about',
            label: 'About US'
        },
    ]

    if (theme === 'loading') {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingComponent />
            </div>)
    }

    return (
        <div className={`navbar-container ${visible ? 'n-visible' : 'n-hidden'}`}>
            {theme === 'loading' && <LoadingComponent />}
            <header className='bg-bgk text-accent-primary'>
                <div className='flex justify-between items-center h-24 px-5 max-w-7xl mx-auto'>
                    <img
                        src="https://www.tastychoice.fi/wp-content/uploads/2022/05/100black-green-2.svg"
                        alt="Logo"
                        className='h-16 w-16 lg:h-24 lg:w-24' />
                    <div className='hidden ml-auto gap-5 items-center justify-center md:flex'>
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.link}
                                className='hover:font-bold hover:scale-110 transition duration-300 ease-in-out'
                            > {item.label} </Link>
                        ))}
                    </div>

                    <div className='flex ml-auto items-center justify-center bgk'>
                        <SearchAppBar />
                        <div>
                            <button
                                onClick={handleOpenUserMenu}>
                                <img
                                    src="https://miro.medium.com/v2/resize:fit:720/1*_ARzR7F_fff_KI14yMKBzw.png"
                                    alt="Remy Sharp"
                                    className='rounded-full w-[30px] h-[30px] object-cover'
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = 'images/no_avatar.jpg'
                                    }}
                                />
                            </button>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <CustomizedSwitches theme={theme} toggleTheme={toggleTheme} />
                                </MenuItem>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <p className="text-center">{setting}</p>
                                    </MenuItem>
                                ))}

                            </Menu>
                        </div>

                        <div className='md:hidden flex justify-center items-center'>
                            <IoIosMenu size={30} />
                        </div>
                    </div>

                </div>
            </header></div>
    )
}
