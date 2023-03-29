import React, { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import {styled} from "@mui/material/styles"
import {useRouter} from "next/router";
const NavMenu = styled(List)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;
const NavMenuItem = styled(ListItem)(({theme})=>`
  color: ${theme.palette.primary.contrastText};
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  &:hover {
    color: ${theme.palette.secondary.main};
  }
`);
const MobileNavMenu = styled(List)`
  width: 250px;
  padding: 0;
`;
const MobileNavMenuItem = styled(ListItem)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: #00ff00;
    cursor: pointer;
  }
`;
const NavButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 16px;
  font-weight: 600;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    display: none;
  }
`;
const NavDrawerButton = styled(IconButton)(({ theme })=>`
  color: ${theme.palette.primary.contrastText};
  font-size: 16px;
  font-weight: 600;
  ${ theme.breakpoints.up('md')} {
    display: none;
  }
`);
const NavDrawer = styled(Drawer)`
  & .MuiPaper-root {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    width: 250px;
  }
`;
const NavLink = styled(Link)`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
type NavItem = {
    label: string;
    href: string;
    icon?: React.ReactElement;
};
type Props = {
    title: string;
    items?: NavItem[];
};

const itemsList = [
    {
        label: '首页',
        href: '/',
    },
    {
        label: '关于',
        href: '/about',
    },
    {
        label: '联系我们',
        href: '/contact',
    },
];
const Nav = ({ title, items = itemsList }: Props) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const router = useRouter();
    const renderNavItems = () => {
        return items.map(({ label, href, icon }) => {
            return (
                <NavLink href={href} key={href}>
                    <NavMenuItem>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                    </NavMenuItem>
                </NavLink>
            );
        });
    };
    const renderMobileNavItems = () => {
        return items.map(({ label, href, icon }) => {
            return (
                <NavLink href={href} key={href}>
                    <MobileNavMenuItem >
                        <ListItemIcon>{icon?icon:''}</ListItemIcon>
                        <ListItemText primary={label} />
                    </MobileNavMenuItem>
                </NavLink>
            );
        });
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <NavDrawerButton edge="start" onClick={() => setIsMobileNavOpen(true)}>

                </NavDrawerButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <NavMenu>
                    {renderNavItems()}
                </NavMenu>
                <NavButton variant="text" onClick={()=>router.push('/login')}>登陆</NavButton>
            </Toolbar>
            <NavDrawer anchor="left" open={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)}>
                <MobileNavMenu>
                    {renderMobileNavItems()}
                </MobileNavMenu>
            </NavDrawer>
        </AppBar>
    );
};
export default Nav;
