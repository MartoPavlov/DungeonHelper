import React from 'react'
import PropTypes from 'prop-types';

/**
 * Component that is like a if statement on DOM level. Highly reuseable.
 * @param {Object} props
 */
function If({condition, els, children}) {
  if (condition) {
    return children;
  } else if (els) {
    return els;
  } else {
    return <div></div>;
  }
}

If.propTypes = {
  condition: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  els: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default If

