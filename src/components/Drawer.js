import React, {useState, useEffect} from 'react';
import {css, StyleSheet} from 'aphrodite';
import CustomButton from './CustomButton';
import If from './If';
import PropTypes from 'prop-types';

/**
 * Component that renders a button that when clicked slides down a new element
 * @param {Object} props 
 */
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

Drawer.propTypes = {
  className: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  childHeight: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default Drawer;
