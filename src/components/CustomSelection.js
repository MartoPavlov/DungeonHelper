import React from 'react';
import {StyleSheet , css} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that renders a selection of items
 * @param {Object} props
 */
const CustomSelection = ({className, items, onChange, value}) => {
  const options = items.map((item) => {
    return <option key={item} value={item}>{item}</option>
  });

  return (
    <select
        className={css(styles.selectionList, className)}
        onChange={(event) => onChange(event.target.value)}
        value={value}
    >
        {options}
    </select>
  );
};

const styles = StyleSheet.create({
  selectionList: {
    fontSize: 18,
    margin: 10,
    backgroundColor: '#fff',
    ':focus': {
      outline: 'none',
    },
  },
});

CustomSelection.propTypes = {
  className: PropTypes.object,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default CustomSelection;
