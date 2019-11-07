import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomTitle from './CustomTitle';

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

export default StatLabel;
