import './LineChart.css';
import React, { useState } from 'react';

const Chart = (props) => {
  const { data, propDragState, setPropDragState, myName, draggable } = props;
  const dataLength = data.length;
  const numericData = data.map((val) => parseFloat(val));
  const maxHeight = Math.max(...numericData);
  const dividerGap = 20;
  const dividers = Math.ceil(maxHeight / dividerGap);
  const chartHeight = dividers * dividerGap;

  const [state, setState] = useState({ coord: { x: 0, y: 0 }, myMouseDown: false, dragging: false });

  const handleDragStart = (e) => {
    setState({ ...state, dragging: true, coord: { } });
    setPropDragState({...propDragState, name: e.target.id, dragging: true, coord: { } });
    console.log('propDragSTateOnStartFromChart', propDragState);
  };

  const handleDrag = (e) => {
    setState({ ...state, dragging: true, coord: { ...state.coord, x: e.clientX } });
    setPropDragState({...propDragState, name: e.target.id, dragging: true, coord: { ...state.coord, x: e.clientX } });
    console.log('propDragSTateFromChart', propDragState);
  };

  const handleDragEnd = (e) => {
    setState({ ...state, dragging: false });
    setPropDragState({...propDragState, name: e.target.id, dragging: null, coord: { } });
    console.log('propDragSTateOnEndFromChart', propDragState);
  };

  return (
    <>
      <div
        className="chart"
        id={myName}
        draggable={draggable}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {
                dataLength > 0 && numericData.map((val, ind) => (
                  <div
                    className="chart-elem"
                    style={{
                      width: `${100 / 2 / dataLength}%`,
                      height: '100%',
                      marginLeft: `${100 / 4 / dataLength}%`,
                      marginRight: `${100 / 4 / dataLength}%`,
                    }}
                    key={ind}
                  >
                    <span
                      style={{
                        width: '100%',
                        height: `${val / chartHeight * 100}%`,
                        backgroundColor: 'blue',
                      }}
                    >
                      <span>{val}</span>
                    </span>
                  </div>
                ))
            }
        {
                [...Array(dividers + 1).keys()].map((divider) => (
                  <span style={{
                    width: '100%', height: 5, position: 'absolute', left: 0, bottom: `${divider * dividerGap / chartHeight * 100}%`,
                  }}
                  >
                    <p>{divider * dividerGap}</p>
                    <hr />
                  </span>
                ))
            }
      </div>
      {/* <p>{`On Mouse Move clientX: ${state.coord.x}`}</p>
      <p>{`On Mouse Move clientY: ${state.coord.y}`}</p>
      <p>{`Mouse is: ${state.myMouseDown === false ? 'Up' : 'Down'}`}</p>
      <p>{`Dragging: ${state.dragging}`}</p> */}
    </>

  );
};

export default Chart;
