import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Tooltip,
    UnstyledButton,
    Center,
    Stack
} from '@mantine/core';

import {
    Home,
    Calendar,
    NewTab, 
    Settings,
    ProfileCircle
} from 'iconoir-react';

import logo from '../../assets/anuLogoMin.png'
import classes from './Nav.module.css';

const mockdata = [
    { icon: Home, label: 'Home', path: '/funcionarios', color: '#e26128' },
    { icon: Calendar, label: 'Calendar', path: '/cronograma', color: '#4F46E5' },
    { icon: NewTab, label: 'Dashboard', path: '/app', color: '#A39787' },
];

interface NavLinkProps {
    icon: typeof Home;
    label: string;
    color?: string;
    active?: boolean;
    onClick?(): void;
}

function NavLink({ icon: Icon, label, color, active, onClick }: NavLinkProps) {
    const defaultColor = 'currentColor';
    const iconColor = active ? (color ?? '#A39787') : undefined;
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon width={20} strokeWidth={1.5} color={iconColor ?? defaultColor} />
            </UnstyledButton>
        </Tooltip>
    );
}

function NavbarLink({ icon: Icon, label }: { icon: typeof Home, label: string }) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton className={classes.link}>
                <Icon width={20} strokeWidth={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

export function Nav() {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const links = mockdata.map((link, index) => (
        <NavLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {
                setActive(index);
                if ((link as any).path) navigate((link as any).path);
            }}
        />
    ));

    // update active based on current route
    useEffect(() => {
        const idx = mockdata.findIndex((m) => m.path === location.pathname);
        if (idx !== -1) setActive(idx);
    }, [location.pathname]);

    return (
        <nav className={classes.navbar}>
            <Center>
                <img src={logo} alt="Logo" width={30} />
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>
            <div>
                <NavbarLink icon={Settings} label="Settings" /> 
            </div>
            <div>
                <NavbarLink icon={ProfileCircle} label="Change account" />
            </div>
        </nav>
    );
}