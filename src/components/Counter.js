import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Counter = ({value, increment, decrement, min = 0, max = 999}) => {
  const shouldRenderMinus = shouldRender(value, min);
  const shouldRenderPlus = shouldRender(value, max);
  
  return (
    <div className={css(styles.iconContainer)}>
      <AddCircleIcon
        className={css(styles.icon)}
        onClick={increment}
        style={{visibility: shouldRenderPlus}}
      />
      <RemoveCircleIcon
        className={css(styles.icon)}
        onClick={decrement}
        style={{visibility: shouldRenderMinus}}
      />
    </div>
  );
};

const shouldRender = (value, breakingPoint) => {
  return value !== breakingPoint ? 'visible' : 'hidden';
}

const styles = StyleSheet.create({
  iconContainer: {
    display: 'inline-block',
    margin: 0,
    textAlign: 'left',
  },
  icon: {
    marginBottom: -5,
    color: '#ec2127',
  }
});

export default Counter;
