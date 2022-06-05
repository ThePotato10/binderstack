const Button = props => {
    return (
        <button className="px-4 py-2 m-1 text-white rounded-lg bg-violet-500 hover:bg-violet-600" onClick={props.callback}>{props.text}</button>
    );
};

export default Button;