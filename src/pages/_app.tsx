import type { AppProps } from "next/app";
import "../style.css";
import "../App.css";
import "./Globals";
import {useEffect} from "react";
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import {Breadcrumbs, Link, Typography} from "@mui/joy";
import {useRouter} from "next/router";
import BreadCrumbs from "../compoents/BreadCrumbs";
import {
  blue
} from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {
    pathname
  } = router;
  useEffect(()=>{
    document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
      // window?.__TAURI__?.invoke('close_splashscreen')
    })
  },[])
  return  <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>;
}
