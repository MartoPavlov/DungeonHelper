import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import CustomSmallInput from './CustomSmallInput';
import CustomTitle from './CustomTitle';
import PropTypes from 'prop-types';

/**
 * Component which is basicly CustomSmallinput with label.
 * @param {Object} props
 * @see CustomSmallInput
 */
const SmallInputField = ({label, value, onChange, className, width = 40}) => {
  return (
    <div className={css(styles.container, className)}>
        <CustomTitle>{label}</CustomTitle>
        <CustomSmallInput
          value={value}
          onChange={onChange}
          width={width}
        />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  },
});

SmallInputField.propTypes = {
  className: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default SmallInputField;
