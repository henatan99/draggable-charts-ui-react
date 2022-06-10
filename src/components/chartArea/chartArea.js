import './ChartArea.css';
import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/delete-icon.png';
import expandIcon from '../../assets/expand-icon.jpg';

const ChartArea = (props) => {
  const {
    chart, plugged, myRef, propState, setPropState, myName,
  } = props;

  const handleZoom = () => setPropState({
    ...propState,
    zoomChart: propState.zoomChart.name === myName ? { name: null } : { name: myName },
  });

  const myStyle = {
    backgroundImage: plugged && 'none',
    width: propState.zoomChart.name === myName && '80%',
    zIndex: propState.zoomChart.name === myName && 50,
  };

  const handleMouseOver = (e) => {
    setPropState({
      ...propState,
      mouse: {
        ...propState.mouse,
        over: e.target.id === 'left' ? { ...propState.mouse.over, left: true } : { ...propState.mouse.over, right: true },
      },
    });
  };

  const handleMouseOut = () => {
    setPropState({
      ...propState,
      mouse: {
        ...propState.mouse,
        over: { left: false, right: false },
      },
    });
  };

  const handleUnplug = () => {
    myName === 'left'
      ? setPropState({
        ...propState,
        plug: {
          ...propState.plug,
          left: false,
        },
      })
      : setPropState({
        ...propState,
        plug: {
          ...propState.plug,
          right: false,
        },
      });
  };

  return (
    <div id={myName} className="chart-area" onMo style={myStyle} ref={myRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <span className="chart-area-top">
        <button type="button" onClick={handleZoom}><img src={expandIcon} alt="expand" /></button>
        <button type="button" onClick={handleUnplug}><img src={deleteIcon} alt="remove" /></button>
      </span>
      <div className="chart-space">
        {
                    plugged && chart && chart
                }
      </div>
      <div>{`zoom ${propState.zoomChart.name}`}</div>
      <div>{`over: ${propState.mouse.over[`${myName}`]}`}</div>
    </div>
  );
};

ChartArea.defaultProps = {
  chart: null,
  plugged: false,
  myRef: null,
  propState: {},
  setPropState: null,
  myName: null,
};

ChartArea.propTypes = {
  chart: PropTypes.func,
  plugged: PropTypes.bool,
  myRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
  propState: PropTypes.shape({
    inputData: PropTypes.string,
    data: PropTypes.instanceOf(Array),
    plug: PropTypes.shape({
      left: PropTypes.bool,
      right: PropTypes.bool,
    }),
    mouse: PropTypes.shape({
      over: PropTypes.shape({
        left: PropTypes.bool,
        right: PropTypes.bool,
      }),
    }),
    drag: PropTypes.shape({
      name: PropTypes.string,
      dragging: PropTypes.bool,
      coord: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
    zoomChart: PropTypes.shape({
      name: PropTypes.string,
    }),
    offset: PropTypes.shape({
      left: PropTypes.instanceOf(Array),
      right: PropTypes.instanceOf(Array),
    }),
  }),
  setPropState: PropTypes.func,
  myName: PropTypes.string,
};

export default ChartArea;
