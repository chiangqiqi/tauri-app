import type { AppProps } from "next/app";

import "../style.css";
import "../App.css";
import {useEffect} from "react";




// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
      // window?.__TAURI__?.invoke('close_splashscreen')
    })
  },[])
  return <Component {...pageProps} />;
}
