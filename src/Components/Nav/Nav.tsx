import { useState } from 'react';
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
    { icon: Home, label: 'Home' },
    { icon: Calendar, label: 'Calendar' },
    { icon: NewTab, label: 'New Tab'},
];

interface NavLinkProps {
    icon: typeof Home;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavLink({ icon: Icon, label, active, onClick }: NavLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon width={20} strokeWidth={1.5} />
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
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (
        <NavLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

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