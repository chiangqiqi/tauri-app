import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    action: {
        type: String,
        unique: true,
        required: true,
    },
    name: String,
    des: String,
    author: {
        type: String,
    },
    flag: String,
}, {
    collection: 'Permission',
    timestamps: true });

const Permission = mongoose.models.Permission || mongoose.model('Permission', permissionSchema);

export default Permission;
