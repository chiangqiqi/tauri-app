import { menuClasses } from '@mui/joy/Menu';
import IconButton from '@mui/joy/IconButton';
import React from "react";

const modifiers = [
    {
        name: 'offset',
        options: {
            offset: ({ placement }) => {
                if (placement.includes('end')) {
                    return [8, 20];
                }
                return [-8, 20];
            },
        },
    },
];

function MenuButton({ children, menu, open, onOpen, onLeaveMenu, label, ...props }) {
    const buttonRef = React.useRef(null);
    const isOnButton = React.useRef(false);
    const menuActions = React.useRef(null);
    const internalOpen = React.useRef(open);

    const handleButtonKeyDown = (event) => {
        internalOpen.current = open;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            onOpen(event);
            if (event.key === 'ArrowUp') {
                menuActions.current?.highlightLastItem();
            }
        }
    };

    return (
        <React.Fragment>
            <IconButton
                {...props}
                ref={buttonRef}
                variant="plain"
                color="neutral"
                aria-haspopup="menu"
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? `nav-example-menu-${label}` : undefined}
                onMouseDown={() => {
                    internalOpen.current = open;
                }}
                onClick={() => {
                    if (!internalOpen.current) {
                        onOpen();
                    }
                }}
                onMouseEnter={() => {
                    onOpen();
                    isOnButton.current = true;
                }}
                onMouseLeave={() => {
                    isOnButton.current = false;
                }}
                onKeyDown={handleButtonKeyDown}
                sx={{
                    bgcolor: open ? 'neutral.plainHoverBg' : undefined,
                    '&.Joy-focusVisible': {
                        bgcolor: 'neutral.plainHoverBg',
                    },
                }}
            >
                {children}
            </IconButton>
            {React.cloneElement(menu, {
                open,
                onClose: () => {
                    menu.props.onClose?.();
                    buttonRef.current?.focus();
                },
                onMouseLeave: () => {
                    onLeaveMenu(() => isOnButton.current);
                },
                actions: menuActions,
                anchorEl: buttonRef.current,
                modifiers,
                slotProps: {
                    listbox: {
                        id: `nav-example-menu-${label}`,
                        'aria-label': label,
                    },
                },
                placement: 'right-start',
                sx: {
                    width: 288,
                    // [`& .${menuClasses?.listbox}`]: {
                    //     '--List-padding': 'var(--List-divider-gap)',
                    // },
                },
            })}
        </React.Fragment>
    );
}

export default MenuButton;
