import React from "react";
import {Box} from "@mui/joy";

import useSwr from 'swr'
import {Test} from "../interfaces";
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";
import Navigation from "../compoents/Navigation";


const fetcher = (url: string) => fetch(url).then((res) => res.json())

const items = [
    {
        label: 'Home',
        href: '/',
        icon: <div>Home</div>,
    },
    {
        label: 'About',
        href: '/about',
        icon: <div>About</div>,
    },
    {
        label: 'Contact',
        href: '/contact',
        icon: <div>Contact</div>,
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
                return <Paper elevation={3} onClick={()=> router.push(`/paper/${id}`)} />
            })
        }
    </Box></>);
}


export default Papers;
