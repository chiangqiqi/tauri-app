import express from 'express';
import axios from 'axios';
import jsSha1 from 'js-sha1';

const router = express.Router();

let weinJson = {
    "appid": "",
    "secret": "",
    "enable": false

}
try {

    weinJson = require('/root/weixin/weixin.json');

} catch (e) {


}


function randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

router.get('/share', async (req, res) => {
    const {url} = req.query;

    if (process.env.NODE_ENV === 'development') {
        const resJson: ResponseJson = ResData.success({
            nonceStr: '',
            signature: '',
            timestamp: ''
        });
        return res.status(200).json(resJson);

    }

    try {
        const timestr = new Date().getTime();
        if (!global.wx.access_token
            || !global.wx.jsapi_ticket
            || (timestr - global.wx.time) > 7100 * 1000
        ) {
            const {data} = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${weinJson.appid}&secret=${weinJson.secret}`)
            const {access_token} = data;

            const token = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)
            const {ticket} = token.data;
            if (ticket && access_token) {
                global.wx = {
                    access_token,
                    jsapi_ticket: ticket,
                    time: timestr
                };
            }
        }

        const nonceStr = randomString(16);
        const timestamp = timestr;

        const signature = jsSha1(`jsapi_ticket=${global.wx.jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`)

        const resJson: ResponseJson = ResData.success({
            nonceStr,
            signature,
            timestamp
        });
        return res.status(200).json(resJson);
    } catch (e) {
        return res.send(ResData.failed(-1, e.message));
    }


});

router.get('/enable', async (req, res) => {
    try {
        console.log(weinJson, 'weinJson.enable')
        const resJson: ResponseJson = ResData.success({
           enable: weinJson.enable
        });
        return res.status(200).json(resJson);
    } catch (e) {
        return res.send(ResData.failed(-1, e.message));
    }

})

export default router;
