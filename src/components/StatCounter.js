import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {useSelector, useDispatch} from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import If from './If';
import {increment, decrement} from '../redux/index';

const StatCounter = ({label}) => {
  const dictionaryLabel = label.toLowerCase();
  const value = useSelector((state) => state.stats[dictionaryLabel]);
  const dispatch = useDispatch();
  const shouldRenderMinus = value > 0 ? 'visible' : 'hidden';

  return (
    <div>
      <span className="label">{label}</span>
      <span className={css(styles.counter)}>{value}</span>
      <AddCircleIcon
        className={css(styles.icon)}
        onClick={() => dispatch(increment(dictionaryLabel))}
      />
      <RemoveCircleIcon
        className={css(styles.icon)}
        onClick={() => dispatch(decrement(dictionaryLabel))}
        style={{visibility: shouldRenderMinus}}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  counter: {
    display: 'inline-block',
    width: 30,
    fontSize: 18,
    border: '1px solid black',
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 8,
  },

  icon: {
    marginBottom: -5,
    color: '#ec2127',
  }
});

export default StatCounter;
