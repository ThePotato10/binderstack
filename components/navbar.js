import router from "next/router";
import { getCookie } from "cookies-next";
import { TiThMenu } from "react-icons/ti";
import { Menu, Item, useContextMenu } from "react-contexify";
  
import "react-contexify/dist/ReactContexify.css";

const Navbar = (props) => {
    const navMenuId = "navMenuId";
    
    const { show } = useContextMenu({
        id: navMenuId
    });

    function displayMenu(e) {
        show(e);
    }

    return (
        <nav className="flex items-center justify-between w-screen h-20 px-6 text-2xl text-white bg-violet-600">
            Binderstack
            {props.isLoggedIn ? <TiThMenu className="cursor-pointer" onClick={displayMenu}/> : null}

            <Menu id={navMenuId}>
                <Item onClick={() => router.push("/")}>Home</Item>
                <Item onClick={() => router.push("/create-binder")}>Create a Binder</Item>
                <Item onClick={() => {}}>Logout</Item>
            </Menu>
        </nav>
    );
};

export default Navbar;