import './GadgetsWrapper.css';
import React from 'react';
import PropTypes from 'prop-types';

const GadgetsWrapper = (props) => {
  const { gadgets } = props;

  return (
    <ul className="gadgets-ul">
      {
                gadgets && gadgets.length > 0
                && gadgets.map((gadget, ind) => <li className="gadget" key={ind}>{gadget}</li>)
            }
    </ul>
  );
};

GadgetsWrapper.defaultProps = {
  gadgets: [],
};

GadgetsWrapper.propTypes = {
  gadgets: PropTypes.instanceOf(Array),
};

export default GadgetsWrapper;
