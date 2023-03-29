import axios from "axios";
import {OauthModel, UserModel} from "../../../model";
import {PlatformEnum} from "../../../model/User";
import moment from "moment";

export default async function getCredentials(req, res) {
    const {
        code
    } = req.query
    try {
        let url = 'https://developer.toutiao.com/api/apps/jscode2session?appid=tt764500f8e97dd52b&secret=c28c924b44184f43ba65cd20cc34f7e28a4075b0&code=' + code;
        const result:any = await axios.get(url);
        const {
            unionid,
            anonymous_openid,
            session_key,
            openid
        } = result.data || {};
        if(!unionid) {
            return res.send(global.ResData.failed(-1,'openId 缺失'));
        }
        const oauthItem:any = await OauthModel.aggregate([
            {
                $match: {
                    openid:unionid,
                    platform: PlatformEnum.DOUYIN
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: {
                    path: "$userInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
        ])

        let oauth:any = null;
        if(oauthItem && oauthItem.length > 0){
            const [ first ] = oauthItem;
            // @ts-ignore
            oauth = await OauthModel.findByIdAndUpdate(first._id,{
                token: session_key,
                token_expire: new Date(
                    moment().add(1, 'h').format('YYYY/MM/DD h:mm:ss')
                )
            },{
                new: true
            })
        } else {
            const userObj = new UserModel({
                username: 'douyin-'+ unionid,
                password: 'douyin',
                phoneNum: 'douyin-'+ unionid,
                platform: PlatformEnum.DOUYIN,
            });
            const user:any = await userObj.save();
            const authObj = new OauthModel({
                platform: PlatformEnum.DOUYIN,
                openid: unionid,
                userId: user._id,
                token: session_key,
                token_expire: new Date(
                    moment().add(1, 'h').format('YYYY/MM/DD h:mm:ss')
                )
            });
            oauth = await authObj.save();
        }
        const {
            token
        } = oauth;
        const resJson: ResponseJson = global.ResData.success({
            token
        });
        return res.status(200).json(resJson);

    } catch (e) {

        return res.send(global.ResData.failed(-1,e.message));
        //https://developer.toutiao.com/api/apps/token?appid=tt764500f8e97dd52b&secret=c28c924b44184f43ba65cd20cc34f7e28a4075b0&grant_type=client_credential'
    }

}
