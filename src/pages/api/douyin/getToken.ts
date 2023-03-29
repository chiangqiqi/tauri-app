import axios from "axios";

export default async function async (req, res){

    try {
        let url = 'https://developer.toutiao.com/api/apps/token?appid=tt764500f8e97dd52b&secret=c28c924b44184f43ba65cd20cc34f7e28a4075b0&grant_type=client_credential';
        const result = await axios.get(url);
        const timestamp = new Date().getTime();
        const {
            data
        } = result;
        const resJson: ResponseJson = global.ResData.success({
            ...data,
            timestamp
        });
        return res.status(200).json(resJson);
    } catch (e) {

        return res.send(global.ResData.failed(-1,e.message));
        //https://developer.toutiao.com/api/apps/token?appid=tt764500f8e97dd52b&secret=c28c924b44184f43ba65cd20cc34f7e28a4075b0&grant_type=client_credential'
    }

}
