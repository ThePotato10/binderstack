import mongoose from "mongoose";
import { setCookies } from "cookies-next";
import Account from "../../../utils/AccountSchema";

export default async function signupHandler(req, res) {
    if (req.method === "POST") {
        const uri = process.env.MONGODB_URL;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Account.create({
            _id: new mongoose.Types.ObjectId, 
            uid: req.body.uid, 
            name: req.body.displayName, 
            email: req.body.email 
        });

        setCookies("uid", req.body.uid, { req, res, maxAge: 60 * 60 * 24 });
        res.status(200).send();
    } else {
        res.status(404).send();
    }
}