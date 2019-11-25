import React from 'react';
import CustomCheckbox from './CustomCheckbox';
import CustomTitle from './CustomTitle';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that displays a regular CustomCheckbox with a label infront
 * @param {Object} props
 * @see CustomCheckbox
 */
const LabeledCheckbox = ({className, label, size, checked, onClick}) => {
  const styles = StyleSheet.create({
    checkbox: {
      display: 'inline-block',
    }
  });

  return (
    <div className={css(className)}>
      <CustomTitle>{label}</CustomTitle>
      <CustomCheckbox
        className={styles.checkbox}
        size={size}
        checked={checked}
        onClick={onClick}
      />
    </div>
  );
};

LabeledCheckbox.propTypes = {
  className: PropTypes.object,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LabeledCheckbox;
