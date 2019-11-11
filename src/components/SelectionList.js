import React from 'react';
import CustomSelection from './CustomSelection';
import CustomTitle from './CustomTitle';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component which is basicly a CustomSelection with a label
 * @param {Object} props
 * @see CustomSelection
 * @todo maybe the name can be changed?
 */
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

SelectionList.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectionList;
