import './ChartArea.css'
import React, { useEffect } from "react";
import deleteIcon from '../../assets/delete-icon.png';
import expandIcon from '../../assets/expand-icon.jpg';

const ChartArea = (props) => {
    const { chart, plugged, myRef, handleUnplug } = props;

    return (
        <div className="chart-area" style={plugged && {backgroundImage: 'none'}} ref={myRef}>
            <span className="chart-area-top">
                <button><img src={expandIcon}></img></button>
                <button onClick={handleUnplug}><img src={deleteIcon}></img></button>
                {/* <button>E</button>
                <button>X</button> */}
            </span>
            <div className="chart-space">
                {
                    plugged && chart && chart
                }
            </div>
        </div>
    )
}

export default ChartArea;