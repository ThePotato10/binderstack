import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
}, { collection: "accounts" });

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema);
export default Account;