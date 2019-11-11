import React, {useState} from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';
import CustomButton from './CustomButton';
import If from './If';
import PlusMinusIcon from './PlusMinusIcon';
import CustomSmallInput from './CustomSmallInput';

/**
 * Component that renders button that when clicked slides to the right and 
 * shows an icon and an input fild. Note that this component is not
 * reusable in the most cases.
 * @param {Object} props
 * @todo Improve reuseability, maybe change it to a class component
 */
const ButtonSlider = ({className, value, onChange, onClick}) => {
  const [clicked, setClicked] = useState(false);
  const [minus , setMinus] = useState(true);
  const renderDefaultState = () => {
    return (
      <CustomButton
        className={styles.changeValue}
        onClick={() => setClicked(true)}
        fontSize={13}
      >
        Change
      </CustomButton>
    );
  }
  const animateButton = {
    'from': {
      transform: 'translateX(-90px)',
      opacity: 0.5,
    },
    'to': {
      transform: 'translateX(0)', 
      opacity: 1,
    }
  };
  const styles = StyleSheet.create({
    container: {
      display: 'inline-block',
      width: '50%',
      marginLeft: 7,
    },
    button: {
      animationName: [animateButton],
      animationDuration: '500ms',
      animationIterationCount: 1,
      display: 'inline-block',
      textAlign: 'start',
    },
    changeValue: {
      textAlign: 'start',
    }
  });
  const changeValue = minus ? -value : value;

  return (
    <div className={css(styles.container, className)}>
      <If condition={clicked} els={renderDefaultState()}>
        <PlusMinusIcon minus={minus} onClick={() => setMinus(!minus)} />
        <CustomSmallInput value={value} onChange={onChange} width={40} />
        <CustomButton
          className={styles.button}
          onClick={() => {
            onClick(changeValue)
            setClicked(false);
          }}
          fontSize={14}
        >
          Confirm
        </CustomButton>
      </If>
    </div>
  );
};

ButtonSlider.propTypes = {
  className: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonSlider;
