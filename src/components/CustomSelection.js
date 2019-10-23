import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const CustomSelection = ({items, onChange}) => {
  const options = items.map((item) => {
    return <option key={item} value={item}>{item}</option>
  });

  return (
    <select
        className={css(styles.selectionList)}
        onChange={(event) => onChange(event.target.value)}>
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

export default CustomSelection;
