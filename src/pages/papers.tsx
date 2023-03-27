import React from "react";
import {Box, Sheet} from "@mui/joy";

import useSwr from 'swr'
import {Test} from "../interfaces";
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";
import Navigation from "../compoents/Navigation";
import {
    Home as HomeIcon,
    Info as InfoIcon,
    Contacts as ContactIcon,

} from '@mui/icons-material';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const items = [
    {
        label: 'Home',
        href: '/',
        icon: <HomeIcon />,
    },
    {
        label: 'About',
        href: '/about',
        icon: <InfoIcon />,
    },
    {
        label: 'Contact',
        href: '/contact',
        icon: <ContactIcon />,
    },
];

function Papers() {

    const router = useRouter();
    const { data = [], error, isLoading } = useSwr<Test[]>(`/api/answer/`, fetcher);
    return ( <><Navigation title="My App" items={items} /><Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
            },
        }}
    >

        {
            data.map(({title}, id)=>{
                return <Paper index={id} elevation={3} onClick={()=> router.push(`/paper/${id}`)} />
            })
        }
    </Box></>);
}


export default Papers;
