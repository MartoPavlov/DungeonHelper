import React from 'react';
import CustomInput from './CustomInput';

const InputField = ({label, value, onChange}) => {
  return (
    <div>
      <span className="label">{label}</span>
      <CustomInput
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
