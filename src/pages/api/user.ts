import express from 'express';
import {
    OauthModel,
    UserModel
} from "../../model";
import { v4 as uuidv4 } from 'uuid';
import {PlatformEnum} from "../../model/User";
import {Authentication} from "../../utils";
const router = express.Router();

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    try {
        // @ts-ignore
        const userList:any = await UserModel.find({username})
        if(userList.length > 0) {
            const [ first ] = userList;
            if(password === first.password) {

                const {
                    id
                } = first;
                // @ts-ignore
                const user: any = await  UserModel.findByIdAndUpdate(id,{
                    token: id,
                }).select({
                    token:1,
                    name:1,
                    username:1,
                    description:1,
                });
                const { token = id,
                    name,
                    username,
                    description
                } = user
                const resJson: ResponseJson = ResData.success({
                    token,
                    name,
                    username,
                    description
                });
                return res.status(200).json(resJson);
            } else {
                return res.send(ResData.failed(-1,'密码错误'));
            }
        } else {
            return res.send(ResData.failed(-1,'该用户不存在'));
        }
    } catch (e) {
        return res.send(ResData.failed(-1,e.message));
    }
});
router.post('/register', async (req, res) => {
    const {
        username,
        password,
        confirmPwd
    } = req.body;
    try {
        if(confirmPwd === password) {

            const user = new UserModel({
                username,
                password,
                userId: uuidv4(),
                platform: PlatformEnum.COMMON
            });
            const result = await user.save();
            if(result) {
                const resJson: ResponseJson = ResData.successInfo(1, '注册成功',);
                return res.status(200).json(resJson);
            } else {
                return res.send(ResData.failed(-1,'注册失败'));
            }


        } else {
            return res.send(ResData.failed(-1,'确认密码两次不一致'));
        }
    } catch (e) {
        return res.send(ResData.failed(-1,e.message));
    }
});


router.get('/profile', async (req, res) => {
    const { token } = req.query;
    try {
        // @ts-ignore
        const user = await UserModel.findById(token).select({
            token:1,
            name:1,
            username:1,
            description:1,
        });
        const resJson: ResponseJson = ResData.success(user||{});
        return res.status(200).json(resJson);
    } catch (e) {
        return res.send(ResData.failed(-1,e.message));
    }
});


router.post('/updateInfo',Authentication, async (req, res) => {
    const {
        name,
        avatarUrl,
        gender,
        city,
        province,
        country,
    } = req.body;
    const {
        // @ts-ignore
        userInfo,
        // @ts-ignore
        platform,
    } = req;
    const {
        userId
    } = userInfo;
    try {
        // @ts-ignore
        const user = await UserModel.findByIdAndUpdate(userId,{
            name,
            avatarUrl,
            gender,
            city,
            province,
            country
        },{
            new: true
        })
        // @ts-ignore
        const oauth = await OauthModel.findOneAndUpdate({
            userId,
            platform:platform
        },{
            name,
            avatarUrl,
            gender,
            city,
            province,
            country
        },{
            new: true
        })

        const resJson: ResponseJson = ResData.success(oauth||{});
        return res.status(200).json(resJson);
    } catch (e) {
        return res.send(ResData.failed(-1,e.message));
    }
});

export default router;
