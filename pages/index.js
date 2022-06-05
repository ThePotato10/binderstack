import mongoose from "mongoose";
import router from "next/router";
import { getCookie } from "cookies-next";
import { MdSearch } from "react-icons/md";

import Binder from "../utils/BinderSchema";
import Account from "../utils/AccountSchema";

import Navbar from "../components/navbar";
import Button from "../components/button";
import PageBreak from "../components/pagebreak";
import PageTitle from "../components/pagetitle";
import BinderTile from "../components/bindertile";
import PageAlignment from "../components/pagealignment";
import InputAndAction from "../components/inputandaction";

// If the user is logged in, as determined by the presence of a uid cookie that links to their firebase uid
// Then the user is shown a page with a list of their binders, a search bar, a button to create a binder, and accout details
// Otherwise, the user is shown a splash page that discusses what this app is

const Home = ({ isLoggedIn, binders }) => {
    if (isLoggedIn) {
        return (
            <>
                <Navbar isLoggedIn={isLoggedIn}/>
                <PageAlignment>
                    <PageTitle text="My Binders"/>
                    { binders.map(binder => {
                        return <BinderTile
                        key={binder._id} 
                        name={binder.name} 
                        pages={binder.pages}
                        address={binder._id}
                        />
                    }) }
                    <Button text="Create" callback={() => router.push("/create-binder")}/>
                    <PageBreak/>
                    <InputAndAction 
                        callback={(input) => console.log(input)}
                        icon={<MdSearch className="text-2xl"/>}
                        placeholderText="Search for binders"
                        buttonText="Search"
                    />
                </PageAlignment>
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <PageAlignment>
                <PageTitle text="Binderstack is your digital filing cabinet"/>
                <PageBreak/>
            </PageAlignment>
        </>
    );
}

export async function getServerSideProps({ req, res }) {
    const uid = getCookie("uid", { req, res });

    if (uid) {
        const uri = process.env.MONGODB_URL;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const account = await Account.findOne({ uid });
        const binders = await Binder.find({ owner: account._id });

        return {
            props: {
                isLoggedIn: true,
                binders: JSON.parse(JSON.stringify(binders))
            }
        }
    }
    
    return {
        props: {
            isLoggedIn: false,
            binder: null
        }
    }
}

export default Home;
