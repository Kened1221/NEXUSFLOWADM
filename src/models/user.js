import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        image: String,
        role: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.models.User || mongoose.model('User', schema);
