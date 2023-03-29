import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {useRouter} from "next/router";
import Link from "next/link";
// 定义配色方案
const theme = createTheme({
    palette: {
        primary: {
            main: '#00C9A7',
        },
        secondary: {
            main: '#FFA500',
        },
        grey: {
            50: grey[50],
            100: grey[100],
            200: grey[200],
            300: grey[300],
            400: grey[400],
            500: grey[500],
            600: grey[600],
            700: grey[700],
            800: grey[800],
            900: grey[900],
        },
    },
});
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`/api/user/login`,{
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            })
        }).then((res) => res.json()).then((data)=>{
            console.log(data)
            const {
                success
            } = data;
            if(success) {
                router.push('/papers')
            }

        })

        // 处理登陆逻辑
    };
    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="grey.50" minHeight="100vh">
                <Container maxWidth="lg" sx={{ display: 'flex' }}>
                    <Box sx={{ display: { xs: 'none', md: 'block' },marginTop:'100px', flex: 1 }}>
                        <Image src="/login1.png" alt="illustration" width={1000} height={600} />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <Container maxWidth="xs">
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                    登陆
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="用户名"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="密码"
                                            type="password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" color="primary" type="submit">
                                            登陆
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} alignItems='center'>
                                       <Link href={'/register'}>注册</Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};
export default Login;
