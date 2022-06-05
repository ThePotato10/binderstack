import mongoose from "mongoose";
import { getCookie } from "cookies-next";
import Binder from "../../../utils/BinderSchema";
import Account from "../../../utils/AccountSchema";

export default async function createBinderHandler(req, res) {
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

    const account = await Account.findOne({ uid: getCookie("uid", { req, res }) });

    await Binder.create({
        name: req.body.binderName,
        owner: account._id,
        pages: []
    });

    res.status(204).send();
}