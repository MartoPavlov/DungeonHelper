import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';
import PropTypes from 'prop-types';

/**
 * Component that renders a label and the numeric value that it represents
 * @param {Object} props 
 */
const StatLabel = ({className, label, value}) => {
  return (
    <div className={css(className)}>
      <CustomTitle>{label}</CustomTitle>
      <span className={css(styles.statLabel)}>{value}</span>
    </div>
  );
};

const styles = StyleSheet.create({
  labeledStat: {
    display: 'inline-block',
  },
  statLabel: {
    border: '1px solid #000',
    fontSize: 18,
    padding: 5,
  }
});

StatLabel.propTypes = {
  className: PropTypes.object,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default StatLabel;
