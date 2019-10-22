import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const StatCounter = ({label, extractValue, increment, decrement,
    min = 0, max = 1000000}) => {
  const dictionaryLabel = label.toLowerCase().replace(/(.+) /, '$1');
  const value = useSelector((state) => extractValue(state, dictionaryLabel));
  const dispatch = useDispatch();
  const shouldRenderMinus = shouldRender(value, min);
  const shouldRenderPlus = shouldRender(value, max);

  return (
    <div>
      <div className={css(styles.labelContainer)}>
        <span className="label ">{label}</span>
      </div>
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
  labelContainer: {
    display: 'inline-block',
    width: '45%',
    textAlign: 'right',
    margin: 0,
  },
  counter: {
    display: 'inline-block',
    width: '2%',
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },
  iconContainer: {
    display: 'inline-block',
    width: '43%',
    margin: 0,
    textAlign: 'left',
  },
  icon: {
    marginBottom: -5,
    color: '#ec2127',
  }
});

export default StatCounter;
