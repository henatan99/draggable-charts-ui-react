import './ChartArea.css'
import React from "react";
import deleteIcon from '../../assets/delete-icon.png';
import expandIcon from '../../assets/expand-icon.jpg';

const ChartArea = (props) => {
    const { chart, plugged } = props;

    return (
        <div className="chart-area" style={plugged && {backgroundImage: 'none'}}>
            <span className="chart-area-top">
                <button><img src={expandIcon}></img></button>
                <button><img src={deleteIcon}></img></button>
                {/* <button>E</button>
                <button>X</button> */}
            </span>
            <div className="chart-space">
                {
                    chart && chart
                }
            </div>
        </div>
    )
}

export default ChartArea;