import mongoose from "mongoose";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { MdPostAdd } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

import Binder from "../utils/BinderSchema";
import Account from "../utils/AccountSchema";

import Navbar from "../components/navbar";
import Button from "../components/button";
import PageTitle from "../components/pagetitle";
import PageBreak from "../components/pagebreak";
import PageAlignment from "../components/pagealignment";
import BinderPageList from "../components/binderpagelist";
import InputAndAction from "../components/inputandaction";


const EditBinder = ({ binder }) => {
    const [pages, setPagesState] = useState(binder.pages);
    
    const addPage = (address) => {
        fetch("http://localhost:3000/api/update/addPage", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ binderId: binder._id, pageAddress: address })
        })
        .then(res => {
            if (res.status === 204) {
                toast.success("Page added successfully");
                setPagesState(pages.concat([address]));
            } else {
                toast.error("Error adding page, please try again");
            }
        });
    };

    const deletePage = (address) => {
        fetch("http://localhost:3000/api/update/removePage", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ binderId: binder._id, pageToDelete: address })
        })
        .then(res => {
            if (res.status === 204) {
                toast.success("Page removed successfully");
                let newPages = pages.filter(e => e !== address);
                setPagesState(newPages);
            } else {
                toast.error("Error deleting page, please try again");
            }
        });
    };

    return (
        <>
            <Navbar isLoggedIn={true}/>
            <PageAlignment>
                <PageTitle text={`Edit: ${binder.name}`}/>
                <PageBreak/>
                <PageTitle text="Pages"/>
                <BinderPageList items={pages} handleDelete={deletePage}/>
                <InputAndAction
                    callback={addPage}
                    icon={<MdPostAdd className="text-2xl"/>}
                    placeholderText="Add a page"
                    buttonText="Add"
                />
                <Button text="Change Name" callback={() => {}}/>
            </PageAlignment>
            <Toaster/>
        </>
    );
}

export async function getServerSideProps({ query, req, res }) {
    const id  = query.id;
    const uid = getCookie("uid", { req, res });
    const uri = process.env.MONGODB_URL;

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const account = await Account.findOne({ uid });
    const binder = await Binder.findById(id);
    
    if (account._id.toString() === binder.owner.toString()) {
        return {
            props: { binder: JSON.parse(JSON.stringify(binder)) }
        };
    } else {
        return {
            redirect: { 
                permanent: false, 
                destination: "/" 
            }
        }
    }
}

export default EditBinder;