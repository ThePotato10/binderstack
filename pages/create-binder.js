import { useState } from "react";

const CreateBinder = () => {
    const [nameState, setNameState] = useState("");

    const dispatchToServer = (binderName) => {
        fetch("http://localhost:3000/api/create/binder", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ binderName })
        });
    }
    
    return (
        <>
            <h1>Create a New Binder</h1>
            <input placeholder="Name" value={nameState} onChange={(event) => setNameState(event.target.value)}/>
            <button onClick={() => dispatchToServer(nameState)}>Create</button>
        </>
    );
};

export default CreateBinder;