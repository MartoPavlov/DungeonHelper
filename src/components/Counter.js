import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PropTypes from 'prop-types';

/**
 * Component that renders a counter that can increment and 
 * decrement a value in a range of values [min, max] given
 * as parameters. Highly reuseable.
 * @param {Object} props 
 * @todo Maybe add a className props
 */
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

/**
 * Function that determines which icons are rendered
 * @param {Number} value
 * @param {Number} breakingPoint
 * @return {String} 'visible' or 'hidden'
 */
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

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Counter;
