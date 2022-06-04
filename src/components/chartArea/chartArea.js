import './ChartArea.css'
import React, { useEffect, useState } from "react";
import deleteIcon from '../../assets/delete-icon.png';
import expandIcon from '../../assets/expand-icon.jpg';

const ChartArea = (props) => {
    const { chart, plugged, myRef, propState, setPropState, myName } = props;

    const handleZoom = (e) => setPropState({
        ...propState,
        zoomChart: propState.zoomChart.name === myName ? {name: null} : {name: myName}
    })

    const myStyle = {
        backgroundImage: plugged && 'none',
        width: propState.zoomChart.name === myName && '100%',
        zIndex: propState.zoomChart.name === myName && 50
    } 

    const handleMouseOver = (e) => {
        setPropState({
            ...propState,
            mouse: {
                ...propState.mouse,
                over: e.target.id === 'left' ? {...propState.mouse.over, left: true} : {...propState.mouse.over, right: true}
            } 
        })
    }

    const handleMouseOut = (e) => {
        setPropState({
            ...propState,
            mouse: {
                ...propState.mouse,
                over: {left: false, right: false}
            } 
        })
    }

    const handleUnplug = () => {
        myName === 'left' ? 
        setPropState({
            ...propState, plug: {
                ...propState.plug,
                left: false
            }
        }) :
        setPropState({
            ...propState, plug: {
                ...propState.plug,
                right: false
            }
        })
    }

    return (
        <div id={myName} className="chart-area" onMo style={myStyle} ref={myRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <span className="chart-area-top">
                <button onClick={handleZoom}><img src={expandIcon}></img></button>
                <button onClick={handleUnplug}><img src={deleteIcon}></img></button>
            </span>
            <div className="chart-space">
                {
                    plugged && chart && chart
                }
            </div>
            <div>{`zoom ${propState.zoomChart.name}`}</div>
            <div>{`over: ${propState.mouse.over[`${myName}`]}`}</div>
        </div>
    )
}

export default ChartArea;