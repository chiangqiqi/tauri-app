import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

export enum GenderEnum {
    N,
    M,
    F,
}
export enum PlatformEnum {
    COMMON,
    DOUYIN,
    wechat,
    chejj

}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    phoneNum: {
        type: String,

        // unique: true,
        // required: true,
    },
    name: String,
    avatarUrl: String,
    gender: String,
    city:String,
    province:String,
    country:String,
    platform: String,
    role: {
        type: ObjectId,
        ref: 'Role'
    },
    description: {
        type: String,
    },
    password: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    token_expire: Date,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    delete: {type: Boolean, default: false},
}, {
    collection: 'User',
    timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
