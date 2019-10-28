import React from 'react';
import {css, StyleSheet} from 'aphrodite';

const CustomHeading = ({children, className}) => {
  return (
    <div className={css(styles.title, className)}>{children}</div>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: '2%',
    marginTop: '4%',
    color: '#ec2127',
    textAlign: 'center',
  }
});

export default CustomHeading;
