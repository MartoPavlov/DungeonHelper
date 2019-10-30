import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const CustomLabel = ({className, children, fontSize = 16, width = '20%'}) => {
  const styles = StyleSheet.create({
    label: {
      display: 'inline-block',
      width: width,
      fontSize: fontSize,
      backgroundColor: '#ec2127',
      color: '#fff',
      borderRadius: 5,
      textAlign: 'center',
    }
  });
    
  return (
    <div className={css(styles.label, className)}>{children}</div>
  );
};

export default CustomLabel;
