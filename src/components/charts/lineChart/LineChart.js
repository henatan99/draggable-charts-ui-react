import './LineChart.css';
import React, { useState } from 'react';

const Chart = (props) => {
  const { data, propState, setPropState, myName, draggable } = props;
  const dataLength = data.length;
  const numericData = data.map((val) => parseFloat(val));
  const maxHeight = Math.max(...numericData);
  const dividerGap = 20;
  const dividers = Math.ceil(maxHeight / dividerGap);
  const chartHeight = dividers * dividerGap;

  const handleDragStart = (e) => {
    setPropState({ ...propState, drag: {name: e.target.id, dragging: true, coord: {x: 0, y: 0}}});
  };

  const handleDrag = (e) => {
    e.stopPropagation()
    setPropState({ ...propState, drag: {name: e.target.id, dragging: true, coord: {x: e.clientX, y: e.clientY}}});
  };

  const handleDragEnd = (e) => {
    e.stopPropagation()
    setPropState({ ...propState, drag: {name: e.target.id, dragging: false, coord: {x: 0, y: 0}}});
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
    </>

  );
};

export default Chart;
