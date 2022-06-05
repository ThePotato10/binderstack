import mongoose from "mongoose";
import { getCookie } from "cookies-next";
import Binder from "../../../utils/BinderSchema";
import Account from "../../../utils/AccountSchema";

export default async function changeBinderNameHandler(req, res) {
    if (!getCookie("uid", { req, res })) {
        res.status(401).send();
        return;
    }

    if (req.method !== "POST") {
        res.status(404).send();
        return;
    }

    const uri = process.env.MONGODB_URL;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const account = await Account.find({ uid: getCookie("uid", { req, res }) });

    await Binder.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.body.binderId),
            owner: account[0]._id
        },
        {
            name: req.body.newBinderName
        }
    );

    res.status(204).send();
}