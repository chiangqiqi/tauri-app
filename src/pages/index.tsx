import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useRouter} from "next/router";

function App() {
 const router = useRouter();
    return (
        <Box
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
                [1,2,3].map((id)=>{
                    return <Paper index={id} elevation={3} onClick={()=> router.push(`/paper/${id}`)} />
                })
            }
        </Box>);
}

export default App;
