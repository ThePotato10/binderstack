import toast, { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBEx2WnwJCXPMfQHd5-jgLC7RJtke7g7Ho",
    authDomain: "pullup-85100.firebaseapp.com",
    projectId: "pullup-85100",
    storageBucket: "pullup-85100.appspot.com",
    messagingSenderId: "420298489339",
    appId: "1:420298489339:web:ae268b3f788e0fd60fdf5e"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const Login = () => {
    const dispatchToServer = (user) => {
        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.status === 200) {
                toast.success("Successful login");
            } else if (response.status === 401) {
                toast.error(<div>User does not exist. Please signup here</div>)
            } else {
                toast.error("500 Internal Server Error. Please contact the dev team");
            }
        });
    }

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then(result => dispatchToServer(result.user))
            .catch(error => console.log("Error in Firebase auth: " + error));
    }

    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
            <Toaster/>
        </div>
    );
}

export default Login;