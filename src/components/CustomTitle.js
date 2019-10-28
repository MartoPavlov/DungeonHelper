import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const CustomTitle = ({children, className}) => {
  const styles = StyleSheet.create({
    label: {
      display: 'inline-block',
      fontSize: 20,
      color: '#ec2127',
      marginRight: 7,
      textAlign: 'center',
    }
  });
  
  return (
    <div className={css(styles.label, className)}>{children}</div>
  );
};

export default CustomTitle;
