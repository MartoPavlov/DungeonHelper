import React from 'react';
import CustomSelection from './CustomSelection';
import CustomTitle from './CustomTitle';
import { css, StyleSheet } from 'aphrodite';

const SelectionList = ({label, items, onChange, className}) => {
  
  return (
    <div className={css(styles.container, className)}>
      <CustomTitle>{label}</CustomTitle>
      <CustomSelection
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
  }
});

export default SelectionList;
