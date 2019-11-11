import React from 'react';
import CustomInput from './CustomInput';
import CustomTitle from './CustomTitle';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders an input field and a label. Highly reuseable.
 * @param {Object} props 
 */
const InputField = ({label, value, onChange, className, password}) => {
  return (
    <div className={css(styles.container, className)}>
      <CustomTitle>{label}</CustomTitle>
      <CustomInput
        value={value}
        onChange={onChange}
        password={password}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

InputField.propTypes = {
  className: PropTypes.object,
  lable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  password: PropTypes.bool,
};

export default InputField;
