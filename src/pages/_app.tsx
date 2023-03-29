import type { AppProps } from "next/app";
import "../style.css";
import "../App.css";
import {useEffect} from "react";
import {useRouter} from "next/router";
import { createTheme, ThemeProvider } from '@mui/material/styles';

/**
 * @apiDefine ResSuccess
 * @apiSuccess {Boolean} success true.
 * @apiSuccess {Number} code 0
 * @apiSuccess {String} errMsg 空字符串
 * @apiSuccess {Object} data 返回数据.
 */
function success(data):ResponseJson {
  return {
    success: true,
    code: 0,
    msg: '',
    data: data
  }
}

function successInfo(code = 1, msg = '', data = null) : ResponseJson {
  return {
    success: true,
    code,
    msg,
    data
  }
}

/**
 * @apiDefine ResFailed
 * @apiError {Boolean} success 接口失败状态.
 * @apiError {Number} code -1
 * @apiError {String} errMsg 错误描述.
 * @apiError {Object} data null.
 */
function failed(code = -1, msg = '', data = null) : ResponseJson {
  return {
    success: false,
    code,
    msg,
    data
  }
}

global.ResData = {
  success,
  failed,
  successInfo,
}

global.wx = {
  access_token: '',
  jsapi_ticket : '',
  time: 0,
}





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
  return  <Component {...pageProps} />;
}
