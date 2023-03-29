import {OauthModel} from "../model";

const Authentication = async (req,res,next)=>{

    const token = req.header('token');
    const platform = req.header('platform');

    if(token && typeof platform!== 'undefined'){
        const oauth = await OauthModel.aggregate([
            {
                $match: {
                    token,
                    platform: Number(platform),
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
        if(oauth && oauth.length > 0){
            const [ first ] = oauth;

            const {
                platform,
                openid,
                name,
                avatarUrl,
                gender,
                userId
            } = first
            if(userId){
                req.userInfo =  {
                    userId,
                    platform,
                    openid,
                    name,
                    avatarUrl,
                    gender,
                };
                next();
                return ;
            }
        }
    }

    return res.send(global.ResData.failed(-101,'用户身份无效'));
};

export default Authentication;
