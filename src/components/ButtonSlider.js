import React, {useState} from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomButton from './CustomButton';
import If from './If';
import PlusMinusIcon from './PlusMinusIcon';
import CustomSmallInput from './CustomSmallInput';

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
      marginLeft: 10,
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

export default ButtonSlider;
