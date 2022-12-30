import React from "react";
import Apps from '@mui/icons-material/Apps';
import {List, ListItem, Menu, MenuItem, Sheet} from "@mui/joy";
import MenuButton from '../compoents/MenuButton';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';

function Workspace() {
    const [menuIndex, setMenuIndex] = React.useState(null);
    const itemProps = {
        onClick: () => setMenuIndex(null),
    };
    const createHandleLeaveMenu = (index) => (getIsOnButton) => {
        setTimeout(() => {
            const isOnButton = getIsOnButton();
            if (!isOnButton) {
                setMenuIndex((latestIndex) => {
                    if (index === latestIndex) {
                        return null;
                    }
                    return latestIndex;
                });
            }
        }, 200);
    };
    return (<Sheet sx={{ borderRadius: 'sm', py: 1, mr: 20, bgcolor: 'background.body' }}>
        <List>
            <ListItem>
                <MenuButton
                    label="Apps"
                    open={menuIndex === 0}
                    onOpen={() => setMenuIndex(0)}
                    onLeaveMenu={createHandleLeaveMenu(0)}
                    menu={
                        <Menu onClose={() => setMenuIndex(null)}>
                            <MenuItem {...itemProps}>Create</MenuItem>
                            <MenuItem {...itemProps}>Application 2</MenuItem>
                            <MenuItem {...itemProps}>Application 3</MenuItem>
                        </Menu>
                    }
                >
                    <Apps />
                </MenuButton>
            </ListItem>
            <ListItem>
                <MenuButton
                    label="Settings"
                    open={menuIndex === 1}
                    onOpen={() => setMenuIndex(1)}
                    onLeaveMenu={createHandleLeaveMenu(1)}
                    menu={
                        <Menu onClose={() => setMenuIndex(null)}>
                            <MenuItem {...itemProps}>Application 1</MenuItem>
                            <MenuItem {...itemProps}>Application 2</MenuItem>
                            <MenuItem {...itemProps}>Application 3</MenuItem>
                        </Menu>
                    }
                >
                    <Settings />
                </MenuButton>
            </ListItem>
            <ListItem>
                <MenuButton
                    label="Person"
                    open={menuIndex === 2}
                    onOpen={() => setMenuIndex(2)}
                    onLeaveMenu={createHandleLeaveMenu(2)}
                    menu={
                        <Menu onClose={() => setMenuIndex(null)}>
                            <MenuItem {...itemProps}>Application 1</MenuItem>
                            <MenuItem {...itemProps}>Application 2</MenuItem>
                            <MenuItem {...itemProps}>Application 3</MenuItem>
                        </Menu>
                    }
                >
                    <Person />
                </MenuButton>
            </ListItem>
        </List>

    </Sheet>);
}

export default Workspace;