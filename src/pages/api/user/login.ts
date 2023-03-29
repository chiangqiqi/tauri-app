import {
    UserModel
} from "../../../model";
import dbConnect from '../../../lib/mongodb';

export default async function handler(req, res){
    switch (req.method) {
        case 'POST':
            const {
                username,
                password
            } = JSON.parse(req.body);
            try {
                await dbConnect();
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
            break;
        case 'GET':
            res.status(200).json({ok:1})
    }

};






