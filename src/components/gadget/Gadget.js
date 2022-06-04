import './Gadget.css'
import React from "react";

const Gadget = (props) => {
    const { title, chart } = props;

    return (
        <>
            <span className="gadget-left">
                { chart }
                <button>Add</button>
            </span>
            <span className="gadget-right"><p>{ title }</p></span>
        </>
    )
}

export default Gadget;