import './GadgetsWrapper.css'
import React from "react";

const GadgetsWrapper = (props) => {
    const { gadgets } = props;

    return (
        <ul className="gadgets-ul">
            {
                gadgets && gadgets.length > 0 && 
                gadgets.map(gadget => <li className="gadget">{gadget}</li>)
            }
        </ul>
    )
}

export default GadgetsWrapper;