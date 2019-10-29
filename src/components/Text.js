import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const Text = ({children, className}) => {
  return (
    <div className={css(styles.text, className)}>{children}</div>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ec2127',
  }
});

export default Text;
