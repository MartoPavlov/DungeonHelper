import React, {useState, useEffect} from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomButton from './CustomButton';
import If from './If';

const Drawer = ({className, label, childHeight=40, children}) => {
  const [shown, setShown] = useState(false);
  const translate = 'translateY(-'+childHeight+'px)';
  const slideDownAnimation = {
    'from': {
      transform: translate,
      opacity: 0
    },
    'to': {
      transform: 'translateY(0)', 
      opacity: 1,
    }
  };
  const styles = StyleSheet.create({
    drawer: {
      textAlign: 'center',
    },
    button: {
      textAlign: 'inherit',
    },
    content: {
      animationName: [slideDownAnimation],
      animationDuration: '1000ms',
      animationIterationCount: 1,
      display: 'inline-block',
      backgroundColor: 'transparent',
      marginTop: 10,
    }
  });
  const handleChange = () => {
    setShown(false);
  }
  useEffect(() => {
    window.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('change', handleChange);
    };
  });

  const contentStyle = shown ? styles.content : '';

  return (
    <div className={css(styles.drawer, className)}>
      <CustomButton
        className={styles.button}
        onClick={() => setShown(!shown)}
      >
        {label}
      </CustomButton>
      <div className={css(contentStyle)}>
        <If condition={shown}>
          {children}
        </If>
      </div>
    </div>
  );
};

export default Drawer;
