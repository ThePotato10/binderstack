import mongoose from "mongoose";
import { getCookie } from "cookies-next";

import Binder from "../../utils/BinderSchema";

import Navbar from "../../components/navbar";
import PageTitle from "../../components/pagetitle";
import PageBreak from "../../components/pagebreak";
import PageAlignment from "../../components/pagealignment";
import BinderLayout from "../../components/binderlayout";

const BinderPage = ({ binder }) => {
    return (
        <>
            <Navbar isLoggedIn={!!getCookie("uid")}/>
            <PageAlignment>
                <PageTitle text={binder.name}/>
                <PageBreak/>
                <BinderLayout pages={binder.pages}/>
            </PageAlignment>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const uri = process.env.MONGODB_URL;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        let binder = await Binder.findById(params.id);

        if (binder) {
            return { props: { binder: JSON.parse(JSON.stringify(binder)) } }
        } else {
            return { redirect: { permanent: false, destination: "/404" } }
        }
    } catch(e) {
        console.log(e);
        return { redirect: { permanent: false, destination: "/404" } }
    }
}

export default BinderPage;