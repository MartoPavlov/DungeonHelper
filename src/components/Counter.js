import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Counter = ({extractValue, increment, decrement,
    min, max, dictionaryLabel}) => {
  const value = useSelector((state) => extractValue(state, dictionaryLabel));
  const dispatch = useDispatch();
  const shouldRenderMinus = shouldRender(value, min);
  const shouldRenderPlus = shouldRender(value, max);

  return (
    <div className={css(styles.container)}>
      <span className={css(styles.counter)}>{value}</span>
      <div className={css(styles.iconContainer)}>
        <AddCircleIcon
          className={css(styles.icon)}
          onClick={() => dispatch(increment(dictionaryLabel))}
          style={{visibility: shouldRenderPlus}}
        />
        <RemoveCircleIcon
          className={css(styles.icon)}
          onClick={() => dispatch(decrement(dictionaryLabel))}
          style={{visibility: shouldRenderMinus}}
        />
      </div>
    </div>
  );
};

const shouldRender = (value, breakingPoint) => {
  return value !== breakingPoint ? 'visible' : 'hidden';
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    marginTop: 4,
    display: 'inline-block',
    width: '45%',
    textAlign: 'left',
  },
  counter: {
    display: 'inline-block',
    width: '4%',
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },
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
