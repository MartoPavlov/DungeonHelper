import React from 'react';
import LoopIcon from '@material-ui/icons/Loop';
import {css, StyleSheet} from 'aphrodite';

const LoadingScreen = ({className, width = '100%', height = '100%'}) => {
  const animateLoading = {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  };

  const styles = StyleSheet.create({
    loadingScreen: {
      display: 'table',
      position: 'relative',
      minWidth: width,
      minHeight: height,
      fontSize: 150,
      textAlign: 'center',
    },
    icon: {
      animationName: [animateLoading],
      animationDuration: '1000ms',
      animationIterationCount: 'infinite',
      verticalAlign: 'middle',
      display: 'table-cell',
      lineHeight: 0.1,
    },
  });

  return (
    <div className={css(styles.loadingScreen, className)}>
      <span className={css(styles.icon)}>
        <LoopIcon color='error' fontSize='inherit' />
      </span>
    </div>
  );
};

export default LoadingScreen;
