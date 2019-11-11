import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that creates a input field. Highly reusable.
 * @param {Object} props 
 */
const CustomInput = ({value, onChange, password, className}) => {
  const type = password ? 'password' : 'text';
  const autoComplete = password ? 'current-password' : '';

  return (
    <input
      className={css(styles.inputField, className)}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoComplete={autoComplete}
    />
  );
};

const styles = StyleSheet.create({

  inputField: {
    borderWidth: 1,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#111',
    padding: 3,
    fontSize: 18,
    margin: 10,
    ':focus': {
      outline: 'none',
    }
  }
});

CustomInput.propTypes = {
  className: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  password: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default CustomInput;
