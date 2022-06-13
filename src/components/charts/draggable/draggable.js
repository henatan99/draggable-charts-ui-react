import React from 'react';
import PropTypes from 'prop-types';

const Draggable = (props) => {
  const {
    propState, setPropState, myName, draggable, chartArea, children,
  } = props;

  // console.log('chartAreafrom chart', chartArea)

  const handleDragStart = (e) => {
    e.stopPropagation();
    setPropState({
      ...propState,
      drag: {
        name: e.target.id, dragging: true, coord: { x: 0, y: 0 },
      },
    });
  };

  const handleDrag = (e) => {
    e.stopPropagation();
    setPropState({
      ...propState,
      drag: {
        name: e.target.id, dragging: true, coord: { x: e.clientX, y: e.clientY },
      },
    });
  };

  const calcOffset = (area, mouse) => {
    const centerX = area.x + area.w / 2;
    const centerY = area.y + area.h / 2;
    const xOff = Math.abs(centerX - mouse.x) / area.w;
    const yOff = Math.abs(centerY - mouse.y) / area.h;
    return [xOff, yOff];
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setPropState({
      ...propState,
      drag: {
        name: e.target.id, dragging: false, coord: { x: e.clientX, y: e.clientY },
      },
    });
    const leftOffset = calcOffset(chartArea.left, { x: e.clientX, y: e.clientY });
    const rightOffset = calcOffset(chartArea.right, { x: e.clientX, y: e.clientY });
    setPropState({ ...propState, offset: { left: leftOffset, right: rightOffset } });
    setPropState({
      ...propState,
      plug: {
        left: propState.plug.left === false
          ? (leftOffset[0] < 0.25 && leftOffset[1] < 0.25) : true,
        right: propState.plug.right === false
          ? (rightOffset[0] < 0.25 && rightOffset[1] < 0.25) : true,
      },
    });
  };

  return (
    <div
      className="chart"
      id={myName}
      draggable={draggable}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      {children}
    </div>
  );
};

Draggable.defaultProps = {
  propState: null,
  setPropState: null,
  myName: null,
  draggable: null,
  chartArea: null,
  children: null
};

Draggable.propTypes = {
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
  draggable: PropTypes.bool,
  chartArea: PropTypes.instanceOf(Element),
  children: PropTypes.instanceOf(Element),
};

export default Draggable;
