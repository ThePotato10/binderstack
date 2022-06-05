import { useState } from "react";
import Button from "./button";

const InputAndAction = (props) => {
    const [input, setInputState] = useState("");

    const handleCallback = () => {
        props.callback(input);
        setInputState("");
    }

    return (
        <div className="flex items-center my-4 focus-within:border-b-2">
            {props.icon}
            <input className="w-full px-4 py-2 focus:outline-none" placeholder={props.placeholderText} value={input} onChange={e => setInputState(e.target.value)} />
            <Button text={props.buttonText} callback={handleCallback}/>
        </div>
    );
};

export default InputAndAction;