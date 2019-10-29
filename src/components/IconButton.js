import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const IconButton = ({className, onClick, children}) => {
  return (
    <div className={css(styles.container, className)} onClick={onClick}>
      {children}
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    cursor: 'pointer',
  },
});

export default IconButton;
