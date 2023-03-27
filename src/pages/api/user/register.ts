import {
    UserModel
} from "../../../model";
import { v4 as uuidv4 } from 'uuid';
import {PlatformEnum} from "../../../model/User";
import dbConnect from '../../../lib/mongodb';

export default async function userHandler(req, res) {
    switch (req.method) {
        case 'POST':
            const {
                username,
                password,
                confirmPwd
            } = JSON.parse(req.body);
            try {
                await dbConnect();
                if(confirmPwd === password) {
                    const userList:any = await UserModel.find({username});
                    if(userList.length > 0){
                        return res.send(ResData.failed(-1,'用户名已存在'));
                    }

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
            break;
        case 'GET':
            res.status(200).json({ok:1});
            break;
    }

};
