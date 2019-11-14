import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import PropTypes from 'prop-types';

/**
 * Component that render a sting in the center of the screen which disappears
 * after 1.5 sec with a sliding up effect
 * @param {Object} props
 */
const FloatingText = ({className, message, variant, playState}) => {
  const animateFloating = {
    'from': {
      opacity: 0.9,
      transform: 'translate(-50%, -50%)',
    },
    'to': {
      opacity: 0,
      transform: 'translate(-50%, -400px)',
    }
  }
  const styles = StyleSheet.create({
    floatingText: {
      animationName: [animateFloating],
      animationDuration: '1500ms',
      animationIterationCount: 'infinity',
      animationFillMode: 'forwards',
      animationPlayState: playState,
      fontSize: 60,
      position: 'absolute',
      top: '50%',
      left: '50%',
      pointerEvents: 'none',
      opacity: 0,
    },
    possitive: {
      color: '#238256',
    },
    negative: {
      color: '#d12628',
    },
    special: {
      color: '#871481',
    },
    normal: {
      color: '000000',
    },
  });

  return (
    <div className={css(styles.floatingText,styles[variant] ,className)}>
      {message}
    </div>
  );
};

FloatingText.propTypes = {
  className: PropTypes.object,
  message: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  variant: PropTypes.oneOf([
    'possitive', 'negative', 'special', 'normal'
  ]).isRequired,
  playState: PropTypes.oneOf([
    'running', 'paused'
  ]).isRequired,
};

export default FloatingText;
