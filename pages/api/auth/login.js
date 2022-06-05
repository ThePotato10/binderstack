import mongoose from "mongoose";
import { setCookies } from "cookies-next";
import Account from "../../../utils/AccountSchema";

export default async function loginHandler(req, res) {
    if (req.method === "POST") {
        const uri = process.env.MONGODB_URL;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const dbRes = await Account.findOne({ uid: req.body.uid });

        setCookies("uid", dbRes.uid, { req, res, maxAge: 60 * 60 * 24 });
        res.status(200).send();

    } else {
        res.status(404).send();

    }
}