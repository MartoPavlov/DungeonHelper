import React, {useState} from 'react';
import "./InputField.css";

const InputField = ({label}) => {
  const [value, setValue] = useState('');

  return (
    <div className="container">
      <span className="label">{label}</span>
      <input
        className="input-field"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};


export default InputField;
