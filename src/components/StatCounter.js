import React, {useState} from 'react';
import {StyleSheet, css} from 'aphrodite';
import AddCircleIcon from '@material-ui/icons/AddCircle'

const StatCounter = ({label, value, onClick}) => {
  const [count, setCount] = useState(value);
  
  return (
    <div>
      <span className="label">{label} - {value}</span>
      <AddCircleIcon className={css(styles.icon)} onClick={onClick} />
    </div>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: -5,
  }
});

export default StatCounter;
