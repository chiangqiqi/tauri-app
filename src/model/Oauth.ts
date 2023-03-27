import mongoose from 'mongoose';


const { ObjectId } = mongoose.Schema.Types;

const OauthSchema = new mongoose.Schema({
    platform: Number,
    openid: String,
    name: String,
    avatarUrl: String,
    gender: String,
    city:String,
    province:String,
    country:String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    token: {
        type: String,
    },
    token_expire: Date,
}, {
    collection: 'Oauth',
    timestamps: true
});

const Oauth = mongoose.models.Oauth || mongoose.model('Oauth', OauthSchema);
export default Oauth;
