import React from 'react';
import CustomSelection from './CustomSelection';

const SelectionList = ({label, items, onChange}) => {
  
  return (
    <div>
      <span className="label">{label}</span>
      <CustomSelection
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectionList;
