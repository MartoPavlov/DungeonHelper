import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a small input box. Highly reusable.
 * @param {Object} props
 * @todo remove the width param and update the rest of the components
 */
const CustomSmallInput = ({className, value, onChange, width}) => {
  const styles = StyleSheet.create({
    smallInput: {
      fontSize: 18,
      width: width,
      marginLeft: 10,
      marginRight: 10,
      ':focus': {
        outline: 'none',
      }
    },
  });

  return (
    <input
      className={css(styles.smallInput, className)}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      maxLength="3"
    /> 
  );
};

CustomSmallInput.propTypes = {
  className: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default CustomSmallInput;
