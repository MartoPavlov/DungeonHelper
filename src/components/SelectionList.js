import React from 'react';
import {StyleSheet , css} from 'aphrodite';

const SelectionList = ({label, items, onChange}) => {
  const options = items.map((item) => {
    return <option key={item} value={item}>{item}</option>
  });
  
  return (
    <div>
      <span className="label">{label}</span>
      <select
        className={css(styles.selectionList)}
        onChange={(event) => onChange(event.target.value)}>
        {options}
      </select>
    </div>
  );
};

const styles = StyleSheet.create({
  selectionList: {
    fontSize: 18,
    backgroundColor: '#fff',
    ':focus': {
      outline: 'none',
    },
  },
});

export default SelectionList;
