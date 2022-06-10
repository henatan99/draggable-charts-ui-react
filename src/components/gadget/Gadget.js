import './Gadget.css';
import React from 'react';
import PropTypes from 'prop-types';

const Gadget = (props) => {
  const { title, chart } = props;

  return (
    <>
      <span className="gadget-left">
        { chart }
        <button type="button">Add</button>
      </span>
      <span className="gadget-right"><p>{ title }</p></span>
    </>
  );
};

Gadget.defaultProps = {
  title: null,
  chart: null,
};

Gadget.propTypes = {
  title: PropTypes.string,
  chart: PropTypes.instanceOf(Element),
};

export default Gadget;
