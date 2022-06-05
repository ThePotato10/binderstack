import mongoose from "mongoose";

const BinderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Account"
    },
    pages: {
        type: [String]
    }
}, { collection: "binders" });

const Binder = mongoose.models.Binder || mongoose.model('Binder', BinderSchema);
export default Binder;