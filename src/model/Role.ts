import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const roleSchema = new mongoose.Schema({
    permissions: [{ type: ObjectId, ref: 'Permission' }],
    name: String,
    des: String,
    author: {
        type: String,
    },
    flag: String,
}, {
    collection: 'Role',
    timestamps: true });

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
export default Role;
